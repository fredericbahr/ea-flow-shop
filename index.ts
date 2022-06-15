import { cloneDeep, random, shuffle } from 'lodash';
import {
  childCreationCount,
  jobAmount,
  maximumIteration,
  operationAmount,
  populationSize,
} from './constants';
import { generateSolutionIndividuals } from './generateIndividuals';
import { Individual } from './interface';
import { doRating, ratingFunction } from './rating';
import { doRecombination } from './recombination';
import { doRepairing, needsRepairing, repair } from './reparing';
import { doSelection } from './selection';
import { prettyPrintIndividual } from './utils';

/**
 * Mutates the individual through shifting a random proportion of
 *
 * @param {Individual} individual the individual to mutate
 * @returns a new mutated individual
 */
const shiftMutation = (individual: Individual): Individual => {
  const newIndividual: Individual = cloneDeep(individual);

  const leftIndex = random(1, individual.genotyp.length - 1);
  const rightIndex = random(1, individual.genotyp.length - 1);

  newIndividual.genotyp[rightIndex] = individual.genotyp[leftIndex];

  if (leftIndex > rightIndex) {
    for (let j = rightIndex; j < leftIndex; j++) {
      newIndividual.genotyp[j + 1] = individual.genotyp[j];
    }
  } else {
    for (let j = leftIndex + 1; j <= rightIndex; j++) {
      newIndividual.genotyp[j - 1] = individual.genotyp[j];
    }
  }

  return newIndividual;
};

/**
 * Gets the best individual of the population based on the fitness
 *
 * @param population the population to get the best from
 * @returns {Individual} the best individual of the population
 */
const getBestIndividual = (population: Individual[]): Individual => {
  return population.sort(
    (a: Individual, b: Individual) =>
      (b.fitness as number) - (a.fitness as number)
  )[0];
};

/**
 * hillclimber
 * Generates maximumIteration´s times individuals and compares each
 * Saves the best
 *
 * @returns the best found individual
 */
const hillclimber = (): Individual => {
  let count = 0;

  let [bestIndividual] = generateSolutionIndividuals(1);

  bestIndividual.fitness = ratingFunction(bestIndividual.genotyp);

  while (count < maximumIteration) {
    count++;
    const mutatedIndividual = shiftMutation(bestIndividual);
    mutatedIndividual.fitness = ratingFunction(mutatedIndividual.genotyp);

    if (mutatedIndividual.fitness >= (bestIndividual.fitness || 0)) {
      bestIndividual = mutatedIndividual;
    }
  }

  return bestIndividual;
};

const ga = (): Individual => {
  let count = 0;
  let population: Individual[] = generateSolutionIndividuals(populationSize);

  population = doRating(population);

  while (count < maximumIteration) {
    const selectedIndividuals = doSelection(population);

    const childIndividuals = doRecombination(population);

    const repairedChildIndividuals = doRepairing(childIndividuals);

    population = doRating([
      ...selectedIndividuals,
      ...repairedChildIndividuals,
    ]);
  }

  return getBestIndividual(population);
};

const bestIndividual = ga();

prettyPrintIndividual(bestIndividual);

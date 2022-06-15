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
import { doMutation, shiftMutation } from './mutation';
import { doRating, ratingFunction } from './rating';
import { doRecombination } from './recombination';
import { doRepairing, needsRepairing, repair } from './reparing';
import { doSelection } from './selection';
import { prettyPrintIndividual } from './utils';

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

    const mutatedChildIndividuals = doMutation(repairedChildIndividuals);

    population = doRating([...selectedIndividuals, ...mutatedChildIndividuals]);

    count++;
  }

  return getBestIndividual(population);
};

const bestIndividual = ga();

prettyPrintIndividual(bestIndividual);

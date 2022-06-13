import { cloneDeep, random, shuffle } from 'lodash';
import {
  calculateProcessingTimeForOperation,
  prettyPrintIndividual,
} from './utils';

export interface Individual {
  genotyp: number[];
  fitness: number | undefined;
}

const jobAmount = 20;
const operationAmount = 5;
const maximumIteration = 300000;

const populationSize = 10;
const recombinationProbability = 0.15;
const mutationProbability = 0.85;
const individualSelectionCount = 5;

/**
 * Rates a genotype with a fitness
 * Calculates the makespan of a schedule
 *
 * @param genotyp the genotyp of an individual to rate
 * @returns the fitness of an individual
 */
const ratingFunction = (genotyp: number[]): number => {
  const copiedGenotyp = [...genotyp];

  const counters = Array(jobAmount).fill(0);
  const maschinesPlan = Array.from(Array(operationAmount), () =>
    new Array(jobAmount).fill(0)
  );

  while (copiedGenotyp.length !== 0) {
    const gene: number | undefined = copiedGenotyp.shift();

    if (!gene) break;

    const index = gene - 1;

    maschinesPlan[counters[index]][index] = calculateProcessingTimeForOperation(
      maschinesPlan,
      counters,
      index
    );

    counters[index]++;
  }

  const makespan = Math.max(...maschinesPlan[maschinesPlan.length - 1]);

  return 1 / makespan;
};

/**
 * Mutates the individual through shifting a random proportion of
 *
 * @returns a new mutated individual
 */
const shiftMutation = (a: Individual): Individual => {
  const newIndividual: Individual = cloneDeep(a);

  const leftIndex = random(1, a.genotyp.length - 1);
  const rightIndex = random(1, a.genotyp.length - 1);

  newIndividual.genotyp[rightIndex] = a.genotyp[leftIndex];

  if (leftIndex > rightIndex) {
    for (let j = rightIndex; j < leftIndex; j++) {
      newIndividual.genotyp[j + 1] = a.genotyp[j];
    }
  } else {
    for (let j = leftIndex + 1; j <= rightIndex; j++) {
      newIndividual.genotyp[j - 1] = a.genotyp[j];
    }
  }

  return newIndividual;
};

const orderRecombination = (a: Individual, b: Individual): Individual => {
  const newIndividual: Individual = { genotyp: [], fitness: undefined };

  const crossoverEnd = random(1, a.genotyp.length - 1);

  for (let index = 0; index <= crossoverEnd; index++) {
    newIndividual.genotyp.push(a.genotyp[index]);
  }

  for (let index = crossoverEnd + 1; index < a.genotyp.length; index++) {
    newIndividual.genotyp.push(b.genotyp[index]);
  }

  return newIndividual;
};

const selection = (population: Individual[]): Individual[] => {
  const selectedPopulation: Individual[] = [];

  for (let index = 0; index < individualSelectionCount; index++) {
    let selection: Individual | undefined = undefined;
    let j = 1;
    let sum = population[j].fitness || -Infinity;

    const randomNumber = random(0, 1);

    while (sum < randomNumber) {
      j++;
      selection = population[j];
      sum = sum + (population[j].fitness || -Infinity);
    }

    if (selection) {
      selectedPopulation.push(selection);
    }
  }

  return selectedPopulation;
};

/**
 * Generates solution individuals
 * @amount amount of solution individuals to generate
 *
 * @return an array of individuals
 */
const generateSolutionIndividuals = (amount: number): Individual[] => {
  const population: Individual[] = [];

  for (let index = 0; index < amount; index++) {
    population.push(generateSolutionIndividual(jobAmount, operationAmount));
  }

  return population;
};

/**
 * Generates an individual which can be a solution to the optimization problem
 *
 * @retunrs an individual
 * @see Individual
 */
const generateSolutionIndividual = (
  jobAmount: number,
  operationAmount: number
): Individual => {
  const sortedGenotyp = getSortedGenotyp(jobAmount, operationAmount);
  const genotyp = shuffle(sortedGenotyp);

  return {
    genotyp,
    fitness: undefined,
  };
};

/**
 * Generates a sorted genotype based on the jobAmount and operation/maschines amount
 * e.g [1, 1, 1, 2, 2, 2, 3, 3, 3]
 *
 * @returns the genotyp of an individual
 */
const getSortedGenotyp = (
  jobAmount: number,
  operationAmount: number
): number[] => {
  const sortedGenotyp: number[] = [];

  for (let index = 0; index < jobAmount; index++) {
    sortedGenotyp.push(...Array(operationAmount).fill(index + 1));
  }

  return sortedGenotyp;
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
  population = population.map((individual) => {
    individual.fitness = ratingFunction(individual.genotyp);

    return individual;
  });

  while (count < maximumIteration) {
    const selectedPopulation = selection(population)
    for (let index = )
  }
};

const bestIndividual = hillclimber();

prettyPrintIndividual(bestIndividual);

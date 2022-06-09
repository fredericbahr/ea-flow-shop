import { shuffle } from 'lodash';
import { calculateProcessingTimeForOperation } from './utils';

interface Individual {
  genotyp: number[];
  fitness: number | undefined;
}

const jobAmount = 13;
const operationAmount = 4;

/**
 * Rates a genotype with a fitness
 * Calculates the makespan of a schedule
 *
 * @param genotyp the genotyp of an individual to rate
 * @returns the fitness of an individual
 */
const ratingFunction = (genotyp: number[]): number => {
  const counters = Array(jobAmount).fill(0);
  const maschinesPlan = Array.from(Array(operationAmount), () =>
    new Array(jobAmount).fill(0)
  );

  while (genotyp.length !== 0) {
    const gene: number | undefined = genotyp.shift();

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

const shiftMutation = (
  a: Individual,
  b: Individual
): [Individual, Individual] => {
  return [
    { genotyp: [], fitness: undefined },
    { genotyp: [], fitness: undefined },
  ];
};

const orderRecombination = (a: Individual, b: Individual): Individual => {
  return { genotyp: [], fitness: 0 };
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

const hillclimber = () => {
  const count = 0;
  const [solutionIdividual] = generateSolutionIndividuals(1);
  const rating = ratingFunction(solutionIdividual.genotyp);
  console.log('rating:', rating);
};

hillclimber();

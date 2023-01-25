import { shuffle } from 'lodash';
import { jobAmount, operationAmount } from '../constants';
import { Individual } from '../interface';
/**
 * Generates solution individuals
 * @param amount amount of solution individuals to generate
 *
 * @return an array of individuals
 */
export const generateSolutionIndividuals = (amount: number): Individual[] => {
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
export const generateSolutionIndividual = (
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

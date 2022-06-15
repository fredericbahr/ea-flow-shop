import { cloneDeep, random } from 'lodash';
import { mutationProbability } from './constants';
import { Individual } from './interface';

/**
 * Handles the mutation of a population
 * Only mutates some individuals of the population
 *
 * @param {Individual[]} populaiton the population to mutate
 * @returns {Individual[]} the population with mutated individuals
 */
export const doMutation = (population: Individual[]): Individual[] => {
  return population.map((individual: Individual) => {
    const randomNumber = random(0, 1);

    if (randomNumber <= mutationProbability) {
      return shiftMutation(individual);
    }

    return individual;
  });
};

/**
 * Mutates the individual through shifting a random proportion of
 *
 * @param {Individual} individual the individual to mutate
 * @returns a new mutated individual
 */
export const shiftMutation = (individual: Individual): Individual => {
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

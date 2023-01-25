import { random } from 'lodash';
import { populationSize, tournamentRounds } from '../constants';
import { Individual } from '../interface';

/**
 * Handles the selection of a population
 *
 * @param population the population to select from
 * @returns the selected individuals of a population
 */
export const doSelection = (population: Individual[]): Individual[] => {
  const selection = tournamentSelection(population, populationSize);

  return selection;
};

/**
 * A fintessproportional selection of a population
 *
 * @param population the population to select from
 * @returns the selected individuals of the population
 */
const fitnessProportionalSelection = (
  population: Individual[],
  count: number
): Individual[] => {
  const selectedPopulation: Individual[] = [];

  for (let index = 0; index < count; index++) {
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
 * A best selection of a population
 *
 * @param population the population to select from
 * @param count the amount of individuals to select
 * @returns the x best individuals of the population
 */
const bestSelection = (
  population: Individual[],
  count: number
): Individual[] => {
  return population
    .sort(
      (a: Individual, b: Individual) =>
        (b.fitness as number) - (a.fitness as number)
    )
    .slice(0, count);
};

/**
 * A tournement selection of a population
 * 
 * @param population the population to select from
 * @param count the amount of individuals to select
 * @returns the x best individuals of the population
 */
const tournamentSelection = (
  population: Individual[],
  count: number
): Individual[] => {
  const selection: Individual[] = [];
  for (let i = 0; i < count; i++) {
    const index = random(0, population.length - 1);
    let currentWinner: Individual = population[index];

    for (let round: number = 2; round < tournamentRounds; round++) {
      const opponentIndex: number = random(0, population.length - 1);
      const opponent: Individual = population[opponentIndex];

      if (
        opponent.fitness !== undefined &&
        currentWinner.fitness !== undefined
      ) {
        if (opponent.fitness > currentWinner.fitness) {
          currentWinner = opponent;
        }
      }

      selection.push(currentWinner);
    }
  }

  return selection;
};

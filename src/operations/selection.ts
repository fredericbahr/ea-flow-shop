import { random } from 'lodash';
import { individualSelectionCount } from '../constants';
import { Individual } from '../interface';

/**
 * Handles the selection of a population
 *
 * @param population the population to select from
 * @returns the selected individuals of a population
 */
export const doSelection = (population: Individual[]) => {
  const selection = bestSelection(population);

  return selection;
};

/**
 * A fintessproportional selection of a population
 *
 * @param population the population to select from
 * @returns the selected individuals of the population
 */
const fitnessProportionalSelection = (
  population: Individual[]
): Individual[] => {
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
 * A best selection of a population
 *
 * @param population the population to select from
 * @returns the x best individuals of the population
 */
const bestSelection = (population: Individual[]): Individual[] => {
  return population
    .sort(
      (a: Individual, b: Individual) =>
        (b.fitness as number) - (a.fitness as number)
    )
    .slice(0, individualSelectionCount);
};

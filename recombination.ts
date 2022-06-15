import { random } from 'lodash';
import { childCreationCount } from './constants';
import { Individual } from './interface';

/**
 * Handles the recombination of individuals of a populatioon
 *
 * @returns the children that were emerged through recombination
 */
export const doRecombination = (population: Individual[]): Individual[] => {
  const children: Individual[] = [];
  for (let index = 0; index < childCreationCount; index++) {
    const firstIndex = random(0, population.length - 1);
    const secondIndex = random(0, population.length - 1);

    children.push(
      orderRecombination(population[firstIndex], population[secondIndex])
    );
  }

  return children;
};

/**
 * A Orderrecombination to recombine two individuals into one child
 *
 * @param {Individual} a the first individual to do a recombine with
 * @param {Individual} b the second individual to do a recombine with
 * @returns {Individual} the emerged indiviudal
 */
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

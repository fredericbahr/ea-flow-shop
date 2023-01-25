import { random } from "lodash";
import { childCreationCount, jobAmount, operationAmount } from "../constants";
import { Individual } from "../interface";

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
 * A order recombination to recombine two individuals into one child
 * @param a the first individual to do a recombine with
 * @param b the second individual to do a recombine with
 * @returns the emerged indiviudal
 */
const orderRecombination = (a: Individual, b: Individual): Individual => {
  const newIndividual: Individual = { genotyp: [], fitness: undefined };
  const crossoverEnd = random(1, a.genotyp.length - 2);

  for (let index = 0; index <= crossoverEnd; index++) {
    newIndividual.genotyp.push(a.genotyp[index]);
  }

  const counters = getCountersForOrderRecombination(newIndividual);

  b.genotyp.forEach((gene: number) => {
    const index = gene - 1;

    if (counters[index] < operationAmount) {
      newIndividual.genotyp.push(gene);
      counters[index]++;
    }
  });

  return newIndividual;
};

/**
 * Gets the counters for a the order recombination of an individual
 * @param child the child indiviual that was created
 * @returns the counters for the individual
 */
const getCountersForOrderRecombination = (child: Individual): number[] => {
  const counters: number[] = Array(jobAmount).fill(0);

  child.genotyp.forEach((gene: number) => counters[gene - 1]++);

  return counters;
};

/**
 * A one point crossover to recombine two individuals into one child
 *
 * @param a the first individual to do a recombine with
 * @param b the second individual to do a recombine with
 * @returns the emerged indiviudal
 */
const onePointCrossover = (a: Individual, b: Individual): Individual => {
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

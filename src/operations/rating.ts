import { jobAmount, operationAmount } from '../constants';
import { processingTimes } from '../data';
import { Individual } from '../interface';

/**
 * Handles the rating of a population
 *
 * @param population the population containing the individuals to rate
 * @returns a population with rated individuals
 */
export const doRating = (population: Individual[]): Individual[] => {
  return population.map((individual) => {
    individual.fitness = ratingFunction(individual.genotyp);

    return individual;
  });
};

/**
 * Rates a genotype with a fitness
 * Calculates the makespan of a schedule
 *
 * @param {number[]} genotyp the genotyp of an individual to rate
 * @returns the fitness of an individual
 */
export const ratingFunction = (genotyp: number[]): number => {
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
 * calculates the processing time for an operation
 * If counter === 0 then get the end processing time of previous operations for first maschine and add the processing time for the jobs operation
 * If counter !== 0 get the maximum of the end processing time of previous operation for the maschine and the end processing time of the jobs previous operation and add the processing time for the jobs operation
 */
export const calculateProcessingTimeForOperation = (
  maschinesPlan: number[][],
  counters: number[],
  index: number
): number => {
  if (counters[index] === 0) {
    const firstMaschineMaximumProcessingTime = Math.max(...maschinesPlan[0]);
    const processingTimeForJob = processingTimes[index][counters[index]];

    return firstMaschineMaximumProcessingTime + processingTimeForJob;
  } else {
    const latestProcessingTimeOfJob = maschinesPlan[counters[index] - 1][index];
    const latestProcessingtimeOfMaschine = Math.max(
      ...maschinesPlan[counters[index]]
    );

    const latestProcessingTime = Math.max(
      latestProcessingTimeOfJob,
      latestProcessingtimeOfMaschine
    );

    const processingTimeForJob = processingTimes[index][counters[index]];

    return latestProcessingTime + processingTimeForJob;
  }
};

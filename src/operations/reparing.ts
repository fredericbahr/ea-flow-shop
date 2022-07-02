import { cloneDeep, flatten, shuffle } from "lodash";
import { jobAmount, operationAmount } from "../constants";
import { Individual } from "../interface";

/**
 * Handles the repairing of a population
 */
export const doRepairing = (population: Individual[]): Individual[] => {
  return population.map((individual: Individual) => {
    if (needsRepairing(individual)) {
      return repair(individual);
    }

    return individual;
  });
};

/**
 * Repairs the individiual
 *
 * @param {Individual} individiual the individual to repair
 * @returns {Individual} the repaired individual
 */
export const repair = (individual: Individual): Individual => {
  const copiedIndividual: Individual = cloneDeep(individual);
  const operationCounters: number[] =
    getOperationCountForJobs(copiedIndividual);

  const missingJobOperations: number[] =
    getMissingJobOperations(operationCounters);
  const shuffledMissingJobOperations: number[] = shuffle(missingJobOperations);

  operationCounters.map((counter: number, index: number) => {
    while (counter > operationAmount) {
      const lastIndexOfOperation = copiedIndividual.genotyp.lastIndexOf(
        index + 1
      );
      if (shuffledMissingJobOperations.length >= 1) {
        const correctionJobOperation = shuffledMissingJobOperations.pop();

        if (correctionJobOperation) {
          copiedIndividual.genotyp[lastIndexOfOperation] =
            correctionJobOperation;
        }
      }

      counter--;
    }
  });

  return copiedIndividual;
};

/**
 * Gets the missings operations for all jobs
 *
 * @param {number[]} operationCounters the counters of done operations
 * @returns {number[]} an array of missing operations per job, e.g. [1, 1, 2]
 */
const getMissingJobOperations = (operationCounters: number[]): number[] => {
  const missingJobOperations: number[] = flatten(
    operationCounters.map((counter: number, index: number) =>
      getMissingJobOperation(counter, index + 1)
    )
  );

  return missingJobOperations;
};

/**
 * Gets the missing operations for a job based on the counter of done  operations
 *
 * @param {number} counter the counter of done operations for a job
 * @param {number} job the job number that is missing,
 * @returns {number[]} the missing operations for a job, e.g [2, 2]
 */
const getMissingJobOperation = (counter: number, job: number): number[] => {
  const differenceOfTotalOperationsAndJobOperationCount =
    operationAmount - counter;
  const missingJobOperationTimes =
    differenceOfTotalOperationsAndJobOperationCount > 0
      ? differenceOfTotalOperationsAndJobOperationCount
      : 0;

  return Array(missingJobOperationTimes).fill(job);
};

/**
 * Checks if an individual needs repairaing aka is not valid
 *
 * @param {Individual} individual the individual to check whether it needs to be repaired
 * @return {boolean} true, if individual needs to be repaired
 */
export const needsRepairing = (individual: Individual): boolean => {
  const operationCounters = getOperationCountForJobs(individual);

  return !operationCounters.every((counter) => counter === operationAmount);
};

/**
 * Gets the count of operations form the individual´s genotyp for each job
 *
 * @param individual the indiviual to get the operation count
 * @return {number[]} the operation counts for each job
 */
const getOperationCountForJobs = (individual: Individual): number[] => {
  const counters: number[] = Array(jobAmount).fill(0);

  individual.genotyp.forEach((gene: number) => {
    const index = gene - 1;
    counters[index]++;
  });

  return counters;
};

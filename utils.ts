import { Individual } from './index';
import { processingTimes } from './data';

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

export const prettyPrintIndividual = (individual: Individual) => {
  console.log(`genotyp: ${individual.genotyp}
fitness: ${individual.fitness}
makespan: ${1 / (individual.fitness || Infinity)}`);
};

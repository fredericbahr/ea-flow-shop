/** amount of jobs in the flow shop problem */
export const jobAmount = 20;
/** amount of operations per job */
export const operationAmount = 5;

/** maximal amount of iteration for a hillclimber or genetic algorithm */
export const maximumIteration = 2000;

/** the size of a population within a step of the genetic algorithm */
export const populationSize = 100;

/** probability of recombination in ga step */
export const recombinationProbability = 0.10;
/** probability of mutation in ga step */
export const mutationProbability = 0.85;

//export const individualSelectionCount = 100;
/** amount of children that are created in a ga step */
export const childCreationCount = 50;

/** rounds each individual should "fight" in a tournament selection */
export const tournamentRounds = 5;

export const debug: boolean = true;

/**
 * Good values for hillclimber
 * maximumIteration = 300000
 *
 * Better values for hillclimber
 * maximumIteration = 500000
 */


/**
 * Good values for ga
 * populationSize = 100
 * maximumIteration = 2000
 * childCreationCount = 50
 * tournamentRounds = 5
 * recombinationProbability = 0.10
 * mutationProbability = 0.5
 */
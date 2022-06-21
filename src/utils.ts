import { processingTimes } from './data';
import { Individual } from './interface';

export const prettyPrintIndividual = (individual: Individual) => {
  console.log(`genotyp: ${individual.genotyp}
fitness: ${individual.fitness}
makespan: ${1 / (individual.fitness || Infinity)}`);
};

export const printPlot = (fitnesses: number[]) => {
  plotly.plot();
};

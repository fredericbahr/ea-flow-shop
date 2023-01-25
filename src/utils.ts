import { processingTimes } from "./data";
import { Individual } from "./interface";
import { plot, Plot } from "nodeplotlib";

/**
 * Prints the individual in a human readable presentation
 * @param individual the individual to print
 */
export const prettyPrintIndividual = (individual: Individual) => {
  console.log(`genotyp: ${individual.genotyp}
fitness: ${individual.fitness}
makespan: ${1 / (individual.fitness || Infinity)}`);
};

/**
 * Prints a plot for a given array of fitnesses
 * @param fitnesses an array of fitnesses of individuals
 */
export const printPlot = (fitnesses: number[]) => {
  const data: Plot[] = [
    {
      x: [...Array(fitnesses.length).fill(0).map((_, i) => i)],
      y: fitnesses,
      type: "scatter",
    },
  ];

  plot(data);
};

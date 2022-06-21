import { processingTimes } from "./data";
import { Individual } from "./interface";
import { plot, Plot } from "nodeplotlib";

export const prettyPrintIndividual = (individual: Individual) => {
  console.log(`genotyp: ${individual.genotyp}
fitness: ${individual.fitness}
makespan: ${1 / (individual.fitness || Infinity)}`);
};

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

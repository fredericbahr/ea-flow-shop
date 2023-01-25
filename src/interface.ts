/** the representation of an idiviual (solution) of the evolutionary algorithm */
export interface Individual {
  /** the genotyp (encoded solution) of an idividual */
  genotyp: number[];
  /** the fitness (rating) of an individual */
  fitness: number | undefined;
}

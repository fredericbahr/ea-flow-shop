interface Individuum {
  genotyp: string;
  fitness: number;
}

const amountJobs = 3;
const amountMaschines = 3;

const ratingFunction = (genotyp: string): number => {
  return 0;
};

const shiftMutation = (
  a: Individuum,
  b: Individuum
): [Individuum, Individuum] => {
  return [
    { genotyp: '', fitness: 0 },
    { genotyp: '', fitness: 0 },
  ];
};

const orderRecombination = (a: Individuum, b: Individuum): Individuum => {
  return { genotyp: '', fitness: 0 };
};

const generateSolutionIndividuals = (amount: number): Individuum[] => {
  
};

const hillclimber = () => {
  const count = 0;
  const [solutionIdividual] = generateSolutionIndividuals(1);
};

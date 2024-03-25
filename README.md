# EA-Flow-Shop

A university project optimizing a flow shop problem using an evolutionary algorithm.
The evolutionary algorithm is based on the [genetic algorithm (GA)](https://en.wikipedia.org/wiki/Genetic_algorithm).

## Background

Following the problem and the concept are shortly summarized.

### Flow Shop Problem

The flow store problem is a classic scheduling problem in which a product is produced by orders on different machines.
Each product must pass through each machine in the same order.
The time required for a product in relation to a specific order on a machine varies.

The aim of optimization is to reduce the overall makespan.

Inputs:
- Amount of jobs
- Amount of operation

Output:
- optimized solution (genotype)
- fitness of the solution
- (optimized) total makespan
- graph showing the total makespan for each iteration

### Evolutionary Algorithm

In this case study two classic evolutionary algorithms were implemented
- [Hill climbin](https://en.wikipedia.org/wiki/Hill_climbing)
- [Genetic Algorithm](https://en.wikipedia.org/wiki/Genetic_algorithm)

#### Hill Climbing

The Hill Climbing algorithm starts with a random solution and checks the fitness of the solution.
Afterwards the algorithm iterates based on a given range and modifies the best found solution randomly.
If a better solution is found, it is safed as the best found solution.
This solution then becomes the new starting point for the modification.
After the iteration range is exceeded the best found solution is returned.
This algorithm suffers when a local maxima is found

#### Genetic Algorithm

The Genetic Algorithm is based on the natural selection process in the evolution.
This implies that a starting population is randomly initialized with a given size.
Each individual in the population is then rated (fitness-based rating) and selected based on this rating.
In an iterative approach successor populations are created from the best individuals in the population by recombining two individuals into one.
Additionally a mutation happens with a given probability to allow for new random individuals

## Implementation

### Hillcliming

The Hill Climbing algorithm uses a shift mutation for modifing the best individual.

### Genetic Algorithm

1. A random population is created
2. The population is rated
3. Children are generated based on two individuals doing a order recombination. The parent indivudals are selected randomly.
4. The children are repaired based on an own logic to always have correct solutions
5. Each individual of the old population is mutated based on a probability with a shift mution
6. The children and (mutated) old population is merged and a tournament selection is peformed to shrink the population size. The best individuals survive.

The implementation contain different recombinations, mutations and selection methdo.s

## Improvements

The Genetic Algorithm can probably be improved if the recombination is not done randomly but based on the fitness of the individuals.
Combining the best individiuals of the current population should result in good or better children as valid/good aspects of the parents are combined into the child.

Additionaly different recombinations, mutations and selection methods can be implemented and their effects evaluated.

## Technology

- TypeScript

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/node-fvbjbs)

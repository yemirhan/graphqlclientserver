import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';

import { Project } from './entity/Project';

@Resolver()
export class DataResolver {
  @Query(() => [Project])
  async projects() {
    console.log(await Project.find({ relations: ['columns'] }));

    return await Project.find({ relations: ['columns'] });
  }
  @Query(() => Project, { nullable: true })
  project(@Arg('projectID', () => Int) projectID: number) {
    return Project.findOne(projectID, { relations: ['columns'] });
  }
  @Mutation(() => Boolean)
  async addProject(@Arg('projectName') projectName: string) {
    try {
      Project.insert({ projectName });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}

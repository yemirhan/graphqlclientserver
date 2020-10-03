import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { getConnection } from 'typeorm';

import { Columns } from './entity/Columns';

import { Project } from './entity/Project';
import { User } from './entity/User';

@InputType()
class ColumnInput {
  @Field(() => String)
  key: string;

  @Field(() => String)
  value: string;
}

@InputType()
class ProjectInput {
  @Field(() => String)
  projectName: string;
}
@Resolver()
export class DataResolver {
  @Query(() => [Project])
  async projects(): Promise<Project[]> {
    return await Project.find({ relations: ['columns'] });
  }
  @Query(() => [Project], { nullable: true })
  async projectsOfUser(
    @Arg('userId', () => Int) userId: number
  ): Promise<Project[]> {
    const user = await getConnection()
      .getRepository(User)
      .findOne({ where: { id: userId } });
    return await Project.find({ where: { user }, relations: ['columns'] });
  }
  @Query(() => Project, { nullable: true })
  project(@Arg('projectID', () => Int) projectID: number) {
    return Project.findOne(projectID, { relations: ['columns'] });
  }

  @Mutation(() => Boolean)
  async addProject(
    @Arg('userId') userId: number,
    @Arg('project') project: ProjectInput,
    @Arg('columns') column: ColumnInput
  ) {
    try {
      //Project.insert(project);
      const user = await getConnection()
        .getRepository(User)
        .findOne({ where: { id: userId } });
      await getConnection()
        .getRepository(Project)
        .insert({ user, projectName: project.projectName });
      await Columns.insert({
        key: column.key,
        value: column.value,
      });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}

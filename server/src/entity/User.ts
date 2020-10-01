import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Project } from './Project';
@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Project, (project) => project.user)
  project: Project[];
}

import { Field, ObjectType } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Project } from './Project';

@ObjectType()
@Entity('columns')
export class Columns extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  key: string;

  @Field(() => String)
  @Column()
  value: string;

  @ManyToOne(() => Project, (project) => project.columns)
  project: Project;
}

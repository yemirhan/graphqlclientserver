import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Columns } from "./Columns";
import { User } from "./User";

@ObjectType()
@Entity("newprojects")
export class Project extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  projectName: string;

  @Field(() => [Columns])
  @OneToMany(() => Columns, (columns) => columns.project, {
    cascade: ["insert"],
  })
  columns: Columns[];

  @ManyToOne(() => User, (user) => user.project)
  user: User;
}

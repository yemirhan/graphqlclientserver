import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { Project } from './Project'
@ObjectType()
@Entity('newusers')
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  email: string

  @Column()
  password: string

  @Column('int', { default: 0 })
  tokenVersion: number

  @OneToMany(() => Project, (project) => project.user)
  project: Project[]
}

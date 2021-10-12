import { Post } from 'src/post/entities/post.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
@Entity({ name: 'profiles' })
export class Profile {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field((type) => Int)
  userId: number;

  @OneToOne((type) => User, (user) => user.profile)
  @JoinColumn()
  user: User;

  @Field((type) => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Field((type) => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  picture?: string;
}

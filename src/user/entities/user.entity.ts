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
import { Profile } from './profile.entity';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column({ unique: true, nullable: false })
  email: string;

  @HideField()
  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  @Field((type) => [Post], { nullable: true })
  posts?: Post[];

  @Field((type) => Profile)
  @OneToOne((type) => Profile, (profile) => profile.user, {
    cascade: true,
  })
  profile: Profile;
}

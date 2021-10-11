import { Post } from 'src/post/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';

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
}

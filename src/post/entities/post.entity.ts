import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'posts' })
export class Post {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 500, nullable: false })
  title: string;

  @Field()
  @Column({ length: 500, nullable: false })
  type: string;

  @Field()
  @Column({ length: 500, nullable: false })
  src: string;

  @ManyToMany(() => User)
  @JoinTable()
  @Field((type) => [User])
  likes: User[];

  @Column()
  @Field((type) => Int)
  userId: number;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.posts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;
}

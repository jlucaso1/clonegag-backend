import { BaseEntity } from 'src/base/entities/base.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'posts' })
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false })
  title: string;

  @Column({ length: 500, nullable: false })
  type: string;

  @Column({ length: 500, nullable: false })
  src: string;

  @ManyToMany(() => User, {
    // eager: true
  })
  @JoinTable()
  likes: Promise<User[]>;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.posts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: Promise<User>;
}

import { BaseEntity } from 'src/base/entities/base.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => User)
  @JoinTable()
  likes: User[];

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.posts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;
}

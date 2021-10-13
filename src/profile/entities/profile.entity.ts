import { BaseEntity } from 'src/base/entities/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile extends BaseEntity {
  @Column()
  userId: number;

  @OneToOne((type) => User, (user) => user.profile)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  picture?: string;
}

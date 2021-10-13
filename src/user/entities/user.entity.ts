import { Post } from 'src/post/entities/post.entity';
import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from 'src/base/entities/base.entity';
import { Profile } from 'src/profile/entities/profile.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToOne((type) => Profile, (profile) => profile.user, {
    cascade: true,
  })
  profile: Profile;
}

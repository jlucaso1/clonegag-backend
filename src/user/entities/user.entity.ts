import { compare, hash } from 'bcrypt';
import { BaseEntity } from 'src/base/entities/base.entity';
import { Post } from 'src/post/entities/post.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  OneToOne
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Post, (post) => post.user, { onDelete: 'CASCADE' })
  posts: Promise<Post[]>;

  @OneToOne((type) => Profile, (profile) => profile.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  profile: Promise<Profile>;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const hashedPassword = await hash(this.password, 10);
      this.password = hashedPassword;
    }
  }

  async comparePassword(attempt: string) {
    return await compare(attempt, this.password);
  }
}

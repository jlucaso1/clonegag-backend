import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PostService } from 'src/post/post.service';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create.user.input';
import { UpdateUserInput } from './dto/update.user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => PostService))
    private postService: PostService,
  ) {}

  findAll(options?: FindManyOptions<User>): Promise<User[]> {
    return this.userRepository.find(options);
  }
  findOne(options: FindOneOptions<User>) {
    return this.userRepository.findOne(options);
  }
  create(createUserInput: CreateUserInput) {
    const newUser = this.userRepository.create(createUserInput);
    return this.userRepository.save(newUser);
  }
  async delete(id: number) {
    return !!(await this.userRepository.delete(id)).affected;
  }
  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.findOne({ where: { id } });

    // Change the user's name
    if (updateUserInput.name) {
      user.name = updateUserInput.name;
    }

    // Change the user's profile
    if (updateUserInput.profile) {
      // Get the profile
      const profile = await user.profile;
      //Merge the profile
      Object.assign(profile, updateUserInput.profile);
      console.log(profile);
    }
    // Change password
    if (updateUserInput.old_password && updateUserInput.new_password) {
      //compare old password
      const isMatch = await user.comparePassword(updateUserInput.old_password);
      if (!isMatch) {
        throw new Error('Old password is wrong');
      }
      //update password
      user.password = updateUserInput.new_password;
    }

    return this.userRepository.save(user);
  }
  findAllPosts(userId: number) {
    return this.postService.findAll({ where: { id: userId } });
  }

  me(id: number) {
    return this.findOne({ where: { id } });
  }
}

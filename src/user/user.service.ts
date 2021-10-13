import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PostService } from 'src/post/post.service';
import { Profile } from 'src/profile/entities/profile.entity';
import { ProfileService } from 'src/profile/profile.service';
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
    const user = await this.findOne({ where: { id }, relations: ['profile'] });

    updateUserInput.profile = Object.assign(
      user.profile,
      updateUserInput.profile,
    );
    const newUser = this.userRepository.merge(user, updateUserInput);

    return this.userRepository.save(newUser);
  }
  findAllPosts(userId: number) {
    return this.postService.findAll({ where: { id: userId } });
  }

  me(id: number) {
    return this.findOne({ where: { id } });
  }
}

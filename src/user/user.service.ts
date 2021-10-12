import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PostService } from 'src/post/post.service';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create.user.input';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { UpdateUserInput } from './dto/update.user.input';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('PROFILE_REPOSITORY')
    private profileRepository: Repository<Profile>,
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
  findProfileByUserId(userId: number) {
    return this.profileRepository.findOne({ where: { userId: userId } });
  }

  me(id: number) {
    return this.findOne({ where: { id } });
  }
}

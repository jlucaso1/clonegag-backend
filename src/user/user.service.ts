import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PostService } from 'src/post/post.service';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create.user.input';
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
  findOne(id: number) {
    return this.userRepository.findOneOrFail(id);
  }
  create(createUserInput: CreateUserInput) {
    const newUser = this.userRepository.create(createUserInput);
    return this.userRepository.save(newUser);
  }
  async delete(id: number) {
    return !!(await this.userRepository.delete(id)).affected;
  }
  async findAllPosts(userId: number) {
    return this.postService.findAll({ where: { id: userId } });
  }
}

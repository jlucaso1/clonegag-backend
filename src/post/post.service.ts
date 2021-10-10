import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { FindManyOptions, Repository } from 'typeorm';
import { CreatePostInput } from './dto/create.post.input';
import { UpdatePostInput } from './dto/update.post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Post>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  findAll(options?: FindManyOptions<Post>): Promise<Post[]> {
    return this.postRepository.find({
      order: {
        upVote: 'DESC',
      },
      ...options,
    });
  }
  findOne(id: number) {
    return this.postRepository.findOne(id);
  }
  getUser(userId: number): Promise<User> {
    return this.userService.findOne(userId);
  }
  async create(data: CreatePostInput): Promise<Post> {
    const user = await this.userService.findOne(data.userId);
    if (!user) {
      throw new Error(`The user with id: ${data.userId} does not exist!`);
    }
    const preloadPost = this.postRepository.create({ ...data, user });
    return this.postRepository.save(preloadPost);
  }
  async delete(id: number): Promise<Boolean> {
    const result = await this.postRepository.delete(id);
    if (!result.affected) {
      throw new Error(`The post with id: ${id} does not exist!`);
    }
    return true;
  }
  update(id: number, updatePostInput: UpdatePostInput) {
    return this.postRepository.update(id, updatePostInput);
  }
  async upVote(id: number) {
    const result = await this.postRepository.increment({ id }, 'upVote', 1);
    return !!result.affected;
  }
}

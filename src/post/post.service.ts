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
      ...options,
      relations: ['likes'],
    });
  }
  findOne(id: number) {
    return this.postRepository.findOne(id, { relations: ['likes'] });
  }
  getUser(userId: number): Promise<User> {
    return this.userService.findOne({ where: { id: userId } });
  }
  async create(data: CreatePostInput, userId: number): Promise<Post> {
    const user = await this.userService.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error(`The user with id: ${userId} does not exist!`);
    }
    const preloadPost = this.postRepository.create({ ...data, user });
    return this.postRepository.save(preloadPost);
  }
  async delete(id: number): Promise<Boolean> {
    const result = await this.postRepository.delete(id);
    if (result.affected == 0) {
      throw new Error(`The post with id: ${id} does not exist!`);
    }
    return true;
  }
  update(id: number, updatePostInput: UpdatePostInput) {
    return this.postRepository.update(id, updatePostInput);
  }

  async likePost(postId: number, userId: number): Promise<Post> {
    try {
      const post = await this.findOne(postId);
      if (post.likes.some((user) => user.id === userId)) {
        post.likes = post.likes.filter((user) => user.id !== userId);
        return this.postRepository.save(post);
      } else {
        const user = await this.userService.findOne({ where: { id: userId } });
        post.likes.push(user);
        return this.postRepository.save(post);
      }
    } catch (err) {
      throw err;
    }
  }
}

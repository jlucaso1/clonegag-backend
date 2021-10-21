import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
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
    return this.postRepository.find(options);
  }
  findOne(options: number | FindOneOptions<Post>) {
    if (typeof options === 'number')
      return this.postRepository.findOne(options);
    else return this.postRepository.findOne(options);
  }
  getUser(userId: number): Promise<User> {
    return this.userService.findOne(userId);
  }
  async create(data: CreatePostInput, userId: number): Promise<Post> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new Error(`The user with id: ${userId} does not exist!`);
    }
    const preloadPost = this.postRepository.create({
      ...data,
    });
    preloadPost.user = Promise.resolve(user);
    return this.postRepository.save(preloadPost);
  }
  async delete(id: number): Promise<Post> {
    const post = await this.findOne(id);

    if (!post) {
      throw new Error(`The post with id: ${id} does not exist!`);
    }

    const deletedPost = await this.postRepository.remove(post);

    if (!deletedPost) {
      throw new Error('Something went wrong while deleting the post');
    }

    return { ...deletedPost, id };
  }
  update(id: number, updatePostInput: UpdatePostInput) {
    return this.postRepository.update(id, updatePostInput);
  }

  async likePost(postId: number, userId: number): Promise<Post> {
    try {
      const post = await this.findOne(postId);
      let likes = await post.likes;
      if (likes.some((user) => user.id === userId)) {
        likes = likes.filter((user) => user.id !== userId);
        post.likes = Promise.resolve(likes);
        return this.postRepository.save(post);
      } else {
        const user = await this.userService.findOne(userId);
        likes.push(user);
        post.likes = Promise.resolve(likes);
        return this.postRepository.save(post);
      }
    } catch (err) {
      throw err;
    }
  }
}

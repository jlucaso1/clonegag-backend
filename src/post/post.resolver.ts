import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Int,
} from '@nestjs/graphql';
import { DeletePostOutput } from './dto/delete.post.output';
import { CreatePostInput } from './dto/create.post.input';
import { UpdatePostInput } from './dto/update.post.input';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Resolver((of) => Post)
export class postResolver {
  constructor(private postService: PostService) {}

  @Query((returns) => [Post])
  posts(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @ResolveField()
  user(@Parent() post: Post) {
    return this.postService.getUser(post.userId);
  }

  @Mutation((returns) => Post)
  @UseGuards(GqlAuthGuard)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser() user: User,
  ) {
    return this.postService.create(createPostInput, user.id);
  }

  @Mutation((returns) => Boolean)
  @UseGuards(GqlAuthGuard)
  deletePost(@Args('postId', { type: () => Int }) postId: number) {
    return this.postService.delete(postId);
  }

  @Mutation((returns) => Post)
  @UseGuards(GqlAuthGuard)
  updatePost(
    @Args('postId', { type: () => Int }) postId: number,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postService.update(postId, updatePostInput);
  }

  @Mutation((returns) => Post)
  @UseGuards(GqlAuthGuard)
  likePost(
    @Args('postId', { type: () => Int }) postId: number,
    @CurrentUser() user: User,
  ) {
    return this.postService.likePost(postId, user.id);
  }
}

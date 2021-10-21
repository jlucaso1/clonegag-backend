import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { CreatePostInput } from './dto/create.post.input';
import { PostDTO } from './dto/post.dto';
import { UpdatePostInput } from './dto/update.post.input';
import { PostService } from './post.service';

@Resolver(() => PostDTO)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [PostDTO])
  posts() {
    return this.postService.findAll();
  }

  @Mutation(() => PostDTO)
  @UseGuards(GqlAuthGuard)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser() user: User,
  ) {
    return this.postService.create(createPostInput, user.id);
  }

  @Mutation(() => PostDTO)
  @UseGuards(GqlAuthGuard)
  deletePost(@Args('postId', { type: () => Int }) postId: number) {
    return this.postService.delete(postId);
  }

  @Mutation(() => PostDTO)
  @UseGuards(GqlAuthGuard)
  updatePost(
    @Args('postId', { type: () => Int }) postId: number,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postService.update(postId, updatePostInput);
  }

  @Mutation(() => PostDTO)
  @UseGuards(GqlAuthGuard)
  likePost(
    @Args('postId', { type: () => Int }) postId: number,
    @CurrentUser() user: User,
  ) {
    return this.postService.likePost(postId, user.id);
  }
}

import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreatePostInput } from './dto/create.post.input';
import { PostDTO } from './dto/post.dto';
import { UpdatePostInput } from './dto/update.post.input';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';

@Resolver((of) => PostDTO)
export class PostResolver {
  constructor(
    private postService: PostService,
    private userService: UserService,
  ) {}

  @Query((returns) => [PostDTO])
  posts(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @ResolveField()
  user(@Parent() post: Post) {
    const { userId } = post;
    return this.userService.findOne({ where: { id: userId } });
  }

  @Mutation((returns) => PostDTO)
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

  @Mutation((returns) => PostDTO)
  @UseGuards(GqlAuthGuard)
  updatePost(
    @Args('postId', { type: () => Int }) postId: number,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postService.update(postId, updatePostInput);
  }

  @Mutation((returns) => PostDTO)
  @UseGuards(GqlAuthGuard)
  likePost(
    @Args('postId', { type: () => Int }) postId: number,
    @CurrentUser() user: User,
  ) {
    return this.postService.likePost(postId, user.id);
  }
}

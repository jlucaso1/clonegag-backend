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
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postService.create(createPostInput);
  }

  @Mutation((returns) => Boolean)
  deletePost(@Args('postId', { type: () => Int }) postId: number) {
    return this.postService.delete(postId);
  }

  @Mutation((returns) => Post)
  updatePost(
    @Args('postId', { type: () => Int }) postId: number,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postService.update(postId, updatePostInput);
  }

  @Mutation((returns) => Boolean)
  upVotePost(@Args('postId', { type: () => Int }) postId: number) {
    return this.postService.upVote(postId);
  }
}

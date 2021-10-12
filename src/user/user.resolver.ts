import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { PostService } from 'src/post/post.service';
import { UpdateUserInput } from './dto/update.user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private postService: PostService,
  ) {}

  @Query((returns) => [User])
  users(): Promise<User[]> {
    return this.userService.findAll();
  }

  // user by id
  @Query((returns) => User)
  user(@Args('userId', { type: () => Int }) userId: number): Promise<User> {
    return this.userService.findOne({ where: { id: userId } });
  }

  @ResolveField()
  async posts(@Parent() user: User) {
    const { id } = user;
    return this.postService.findAll({ where: { id } });
  }

  @ResolveField()
  profile(@Parent() user: User) {
    return this.userService.findProfileByUserId(user.id);
  }

  @Query((returns) => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User) {
    return this.userService.me(user.id);
  }

  @Mutation((returns) => User)
  @UseGuards(GqlAuthGuard)
  editUser(
    @CurrentUser() user: User,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(user.id, updateUserInput);
  }
}

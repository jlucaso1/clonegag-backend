import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation, Query, Resolver
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { PostService } from 'src/post/post.service';
import { ProfileService } from 'src/profile/profile.service';
import { UpdateUserInput } from './dto/update.user.input';
import { UserDTO } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver((of) => UserDTO)
export class UserResolver {
  constructor(
    private userService: UserService,
    private postService: PostService,
    private profileService: ProfileService,
  ) {}

  @Query((returns) => [UserDTO])
  users(): Promise<User[]> {
    return this.userService.findAll();
  }

  // user by id
  @Query((returns) => UserDTO)
  user(@Args('userId', { type: () => Int }) userId: number): Promise<User> {
    return this.userService.findOne({ where: { id: userId } });
  }

  // @ResolveField(() => [PostDTO])
  // async posts(@Parent() user: User) {
  //   const { id } = user;
  //   return this.postService.findAll({ where: { id } });
  // }

  // @ResolveField(() => ProfileDTO)
  // profile(@Parent() user: User) {
  //   const { id: userId } = user;
  //   return this.profileService.findOne({ where: { userId } });
  // }

  @Query((returns) => UserDTO)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User) {
    return this.userService.me(user.id);
  }

  @Mutation((returns) => UserDTO)
  @UseGuards(GqlAuthGuard)
  editUser(
    @CurrentUser() user: UserDTO,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(user.id, updateUserInput);
  }
}

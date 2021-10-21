import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UpdateUserInput } from './dto/update.user.input';
import { UserDTO } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => UserDTO)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserDTO])
  users() {
    return this.userService.findAll();
  }

  @Query(() => UserDTO)
  user(@Args('userId', { type: () => Int }) userId: number) {
    return this.userService.findOne(userId);
  }

  @Query(() => UserDTO)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User) {
    return this.userService.me(user.id);
  }

  @Mutation(() => UserDTO)
  @UseGuards(GqlAuthGuard)
  editUser(
    @CurrentUser() user: UserDTO,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(user.id, updateUserInput);
  }

  @Mutation(() => UserDTO)
  @UseGuards(GqlAuthGuard)
  deleteMe(@CurrentUser() user: UserDTO) {
    return this.userService.delete(user.id);
  }
}

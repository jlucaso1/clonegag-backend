import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostService } from 'src/post/post.service';
import { CreateUserInput } from './dto/create.user.input';
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

  @Mutation((returns) => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @ResolveField()
  async posts(@Parent() user: User) {
    const { id } = user;
    return this.postService.findAll({ where: { id } });
  }
}

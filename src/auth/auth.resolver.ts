import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoginInput } from './dto/login.input';
import { LoginOutput } from './dto/login.output';
import { RegisterInput } from './dto/register.input';
import { RegisterOutput } from './dto/register.output';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => RegisterOutput)
  async register(@Args('registerUserInput') registerInput: RegisterInput) {
    const user = await this.authService.register(registerInput);
    const access_token = this.authService.login(user);
    return access_token;
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const { email, password } = loginInput;
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user);
  }

  @Query((returns) => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User) {
    return this.authService.me(user.id);
  }
}

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { LoginOutput } from './dto/login.output';
import { RegisterInput } from './dto/register.input';
import { RegisterOutput } from './dto/register.output';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => RegisterOutput)
  async register(@Args('registerUserInput') registerInput: RegisterInput) {
    const user = await this.authService.register(registerInput);
    const access_token = this.authService.login(user);
    return access_token;
  }

  @Mutation(() => LoginOutput)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const { email, password } = loginInput;
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user);
  }
}

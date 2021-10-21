import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInputError } from 'apollo-server-express';
import { Profile } from 'src/profile/entities/profile.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { RegisterInput } from './dto/register.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: Partial<User>) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
  async register(registerDTO: RegisterInput) {
    try {
      const user = new User();
      Object.assign(user, registerDTO);
      const profile = new Profile();
      Object.assign(profile, registerDTO.profile);
      user.profile = Promise.resolve(profile);
      return await this.userService.create(user);
    } catch (error) {
      //error in user creation
      throw new UserInputError('Error in User creation', error.driverError);
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOne({
      where: { email },
    });
    if (!user) throw new Error('User not Found');
    const isMatch = await user.comparePassword(password);
    // const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid password');
    return user;
  }
}

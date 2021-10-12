import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterInput } from './dto/register.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserInputError } from 'apollo-server-express';
import { Profile } from 'src/user/entities/profile.entity';

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
    const hashedPassword = await bcrypt.hash(registerDTO.password, 10);
    registerDTO.password = hashedPassword;
    try {
      const user = new User();
      Object.assign(user, registerDTO);
      const profile = new Profile();
      Object.assign(profile, registerDTO.profile);
      user.profile = profile;
      const {
        password,
        profile: _profile,
        ...rest
      } = await this.userService.create(user);
      return rest;
    } catch (error) {
      throw new UserInputError('User exists in database');
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOne({
      where: { email },
    });
    if (!user) throw new Error('User not Found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid password');
    return user;
  }
}

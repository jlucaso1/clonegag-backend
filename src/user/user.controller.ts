import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserInput } from './dto/create.user.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Get('/:id')
  find(@Param('id') id: number) {
    return this.userService.findOne(id);
  }
  @Get('/:id/posts')
  findPosts(@Param('id') id: number) {
    return this.userService.findAllPosts(id);
  }
  @Post()
  add(@Body() createUserDTO: CreateUserInput) {
    return this.userService.create(createUserDTO);
  }
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    const result = await this.userService.delete(id);
    return { success: result };
  }
}

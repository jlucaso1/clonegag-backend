import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreatePostInput } from './dto/create.post.input';
import { Post as PostEntity } from './entities/post.entity';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }
  @Post()
  add(@Body() postData: CreatePostInput) {
    return this.postService.create(postData);
  }
  @Get('/:id')
  find(@Param('id') id: number) {
    return this.postService.findOne(id);
  }
  @Delete('/:id')
  async delete(@Param('id') id: number, @Res() res: Response) {
    const success = await this.postService.delete(id);
    if (success) {
      res.status(HttpStatus.OK).json({ success });
    } else {
      res.status(HttpStatus.NOT_FOUND).send({ success });
    }
  }
  @Patch('/:id/upvote')
  async upVote(@Param('id') id: number) {
    return this.postService.upVote(id);
  }
}

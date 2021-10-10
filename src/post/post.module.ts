import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { DatabaseModule } from '../database/database.module';
import { PostController } from './post.controller';
import { postProviders } from './post.providers';
import { postResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule)],
  providers: [...postProviders, PostService, postResolver],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}

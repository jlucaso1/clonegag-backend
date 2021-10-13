import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { DatabaseModule } from '../database/database.module';
import { postProviders } from './post.providers';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule)],
  providers: [...postProviders, PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}

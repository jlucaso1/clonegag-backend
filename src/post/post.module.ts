import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { DatabaseModule } from '../database/database.module';
import { postProviders } from './post.providers';
import { postResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => UserModule)],
  providers: [...postProviders, PostService, postResolver],
  exports: [PostService],
})
export class PostModule {}

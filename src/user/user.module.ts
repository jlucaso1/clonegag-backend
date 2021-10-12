import { forwardRef, Module } from '@nestjs/common';
import { PostModule } from 'src/post/post.module';
import { DatabaseModule } from '../database/database.module';
import { profileProviders } from './profile.providers';
import { userProviders } from './user.providers';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => PostModule)],
  providers: [...userProviders, ...profileProviders, UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}

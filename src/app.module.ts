import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PostModule } from './post/post.module';

import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
    UserModule,
    PostModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PostModule } from './post/post.module';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    UserModule,
    PostModule,
    AuthModule,
  ],
})
export class AppModule {}

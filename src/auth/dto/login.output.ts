import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class LoginOutput {
  @Field()
  access_token: string;
  @Field(() => User)
  user: User;
}

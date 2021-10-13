import { Field, ObjectType } from '@nestjs/graphql';
import { UserDTO } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class RegisterOutput {
  @Field()
  access_token: string;

  @Field(() => UserDTO)
  user: User;
}

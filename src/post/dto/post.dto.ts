import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseDTO } from 'src/base/dto/base.dto';
import { UserDTO } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';

@ObjectType('Post')
export class PostDTO extends BaseDTO {
  @Field()
  title: string;

  @Field()
  type: string;

  @Field()
  src: string;

  @Field(() => [UserDTO])
  likes: User[];

  @Field(() => Int)
  userId: number;

  @Field(() => UserDTO)
  user: User;
}

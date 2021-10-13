import { IDField } from '@nestjs-query/query-graphql';
import { Field, ID, ObjectType } from '@nestjs/graphql';
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

  @IDField(() => ID)
  userId: number;

  @Field(() => UserDTO)
  user: User;
}

import { IDField } from '@nestjs-query/query-graphql';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseDTO } from 'src/base/dto/base.dto';
import { UserDTO } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';


@ObjectType()
export class ProfileDTO extends BaseDTO {
  @IDField(() => ID)
  userId: number;

  @Field(() => UserDTO)
  user: User;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  picture?: string;
}

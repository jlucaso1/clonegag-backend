import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDTO } from 'src/base/dto/base.dto';

@ObjectType('Profile')
export class ProfileDTO extends BaseDTO {
  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  picture?: string;
}

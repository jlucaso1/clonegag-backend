import { Field, InputType } from '@nestjs/graphql';
import {
  IsEnum, IsUrl,
  MinLength
} from 'class-validator';

@InputType()
export class CreatePostInput {
  @MinLength(5)
  @Field({ nullable: false })
  title: string;
  @IsEnum(['IMAGE', 'VIDEO'])
  @Field({ nullable: false })
  type: string;
  @IsUrl()
  @Field({ nullable: false })
  src: string;
}

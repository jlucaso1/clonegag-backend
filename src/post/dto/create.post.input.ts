import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsAlpha,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsUrl,
  MinLength,
} from 'class-validator';

@InputType()
export class CreatePostInput {
  @MinLength(5)
  @Field({ nullable: false })
  title: string;
  @IsInt()
  @Field((type) => Int, { nullable: false })
  userId: number;
  @IsEnum(['IMAGE', 'VIDEO'])
  @Field({ nullable: false })
  type: string;
  @IsUrl()
  @Field({ nullable: false })
  src: string;
}

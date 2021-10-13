import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsEmail()
  @Field({ nullable: false })
  email: string;

  @MinLength(8)
  @Field({ nullable: false })
  password: string;

  @MinLength(5)
  @Field({ nullable: false })
  name: string;
}

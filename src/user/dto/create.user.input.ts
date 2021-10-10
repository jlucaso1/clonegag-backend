import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsEmail()
  @Field({ nullable: false })
  email: string;

  @MinLength(5)
  @Field({ nullable: false })
  name: string;
}

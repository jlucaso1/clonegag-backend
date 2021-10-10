import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @MinLength(5)
  @Field({ nullable: false })
  name: string;
}

import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class UpdatePostInput {
  @MinLength(5)
  @Field({ nullable: false })
  title: string;
}

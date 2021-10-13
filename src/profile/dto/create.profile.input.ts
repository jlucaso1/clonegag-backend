import { Field, InputType } from '@nestjs/graphql';
import { IsUrl, MaxLength } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @MaxLength(255)
  @Field((type) => String, { nullable: true })
  bio?: string;

  @IsUrl()
  @Field((type) => String, { nullable: true })
  picture?: string;
}

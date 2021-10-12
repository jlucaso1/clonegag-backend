import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUrl, MaxLength } from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @IsOptional()
  @MaxLength(255)
  @Field((type) => String, { nullable: true })
  bio?: string;

  @IsOptional()
  @IsUrl()
  @Field((type) => String, { nullable: true })
  picture?: string;
}

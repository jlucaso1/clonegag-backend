import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MinLength } from 'class-validator';
import { UpdateProfileInput } from 'src/profile/dto/update.profile.input';


@InputType()
export class UpdateUserInput {
  @IsOptional()
  @MinLength(5)
  @Field({ nullable: true })
  name: string;

  @IsOptional()
  @Field((type) => UpdateProfileInput, { nullable: true })
  profile: UpdateProfileInput;
}

import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsNotEmpty, IsOptional, MinLength,  } from 'class-validator';
import { CreateProfileInput } from 'src/user/dto/create.profile.input';
import { UpdateProfileInput } from './update.profile.input';

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

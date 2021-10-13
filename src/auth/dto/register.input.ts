import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { CreateProfileInput } from 'src/profile/dto/create.profile.input';


@InputType()
export class RegisterInput {
  @IsEmail({}, { message: 'Email is not valid' })
  @Field({ nullable: false })
  email: string;

  @MinLength(8)
  @Field({ nullable: false })
  password: string;

  @MinLength(5)
  @Field({ nullable: false })
  name: string;

  @Field((type) => CreateProfileInput, { nullable: true })
  profile: CreateProfileInput;
}

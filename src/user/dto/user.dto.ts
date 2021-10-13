import { Field, ObjectType } from '@nestjs/graphql';
import { Profile } from 'passport';
import { BaseDTO } from 'src/base/dto/base.dto';
import { PostDTO } from 'src/post/dto/post.dto';
import { Post } from 'src/post/entities/post.entity';
import { ProfileDTO } from 'src/profile/dto/profile.dto';

@ObjectType('User')
export class UserDTO extends BaseDTO {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [PostDTO])
  posts: Post[];

  @Field(() => ProfileDTO)
  profile: Profile;
}

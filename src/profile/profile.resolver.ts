import { Resolver } from '@nestjs/graphql';
import { ProfileDTO } from './dto/profile.dto';

@Resolver((of) => ProfileDTO)
export class ProfileResolver {
  // constructor(private profileService: ProfileService) {}
}

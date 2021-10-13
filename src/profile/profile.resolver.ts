import { ResolveField, Parent, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { ProfileDTO } from './dto/profile.dto';
import { ProfileService } from './profile.service';

@Resolver((of) => ProfileDTO)
export class ProfileResolver {
  // constructor(private profileService: ProfileService) {}
}

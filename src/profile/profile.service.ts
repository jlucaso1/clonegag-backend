import { Inject, Injectable } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('PROFILE_REPOSITORY')
    private profileRepository: Repository<Profile>,
  ) {}
  findOne(options: FindOneOptions<Profile>) {
    return this.profileRepository.findOne(options);
    // return new Profile();
  }
}

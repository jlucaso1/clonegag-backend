import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { profileProviders } from './profile.providers';
import { ProfileService } from './profile.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...profileProviders,
    ProfileService,
    // ProfileResolver
  ],
  exports: [ProfileService],
})
export class ProfileModule {}

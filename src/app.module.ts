import { Module } from '@nestjs/common'
import { UserModule } from './modules/users/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { ProviderModule } from './infra/providers/provider.module'
import { PersistenceModule } from './infra/persistence/persistence.module'
import { CoursesModule } from './modules/courses/courses.module'
import { UserInterestsModule } from './modules/user-interests/user-interests.module'
@Module({
  imports: [
    UserModule,
    PersistenceModule,
    AuthModule,
    ProviderModule,
    ConfigModule.forRoot(),
    CoursesModule,
    UserInterestsModule,
  ],
})
export class AppModule {}

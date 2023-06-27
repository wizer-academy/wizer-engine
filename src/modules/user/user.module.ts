import { Module } from '@nestjs/common'
import { UUIDProviderImpl } from 'src/shared/providers/uuid-provider/implementations/uuid-provider'
import { UserRegisterService } from './services/register-user.service'
import { UserDeleteService } from './services/delete-user.service'
import { UserGetService } from './services/get-user.service'
import { UserUpdateService } from './services/update-user.service'
import { UserGetController } from './controllers/user-get.controller'
import { UserUpdateController } from './controllers/user-update.controller'
import { UserDeleteController } from './controllers/user-delete.controller'
import { UserRegisterController } from './controllers/user-register.controller'
import { UserRepositoryOrmPrisma } from './repositories/implementations/user-repository-orm-prisma'
import { PersistenceModule } from 'src/infra/persistence/persistence.module'
import { UserUploadUserPhotoController } from './controllers/upload-photo.controller'
import { UploadUserPhotoService } from './services/upload-user-photo.service'
import { UserInterestsAddController } from './controllers/user-interests-add.controller'
import { AddUserInterestsService } from './services/add-user-interests.service'
import { UpdateUserInterestsService } from './services/update-user-interests.service'

@Module({
  imports: [PersistenceModule],
  controllers: [
    UserGetController,
    UserUpdateController,
    UserDeleteController,
    UserRegisterController,
    UserUploadUserPhotoController,
    UserInterestsAddController,
  ],
  providers: [
    UserRegisterService,
    UserDeleteService,
    UserGetService,
    UserUpdateService,
    UploadUserPhotoService,
    AddUserInterestsService,
    UpdateUserInterestsService,
    {
      provide: 'UUIDProvider',
      useClass: UUIDProviderImpl,
    },
    {
      provide: 'UserRepository',
      useClass: UserRepositoryOrmPrisma,
    },
  ],
  exports: [UserGetService],
})
export class UserModule {}

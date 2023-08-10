import { Module } from '@nestjs/common'
import { UserRegisterService } from './services/user-register.service'
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
import { CreateUserInterestsController } from '../user-interests/controller/create-user-interests.controller'
import { CreateUserInterestsService } from '../user-interests/services/create-user-interests.service'
import { UpdateUserInterestsService } from '../user-interests/services/update-user-interests.service'
import { ProviderModule } from 'src/infra/providers/provider.module'
import { UUIDProviderImpl } from 'src/infra/providers/uuid-provider/implementations/uuid-provider'

@Module({
  imports: [PersistenceModule, ProviderModule],
  controllers: [
    UserGetController,
    UserUpdateController,
    UserDeleteController,
    UserRegisterController,
    UserUploadUserPhotoController,
    CreateUserInterestsController,
  ],
  providers: [
    UserRegisterService,
    UserDeleteService,
    UserGetService,
    UserUpdateService,
    UploadUserPhotoService,
    CreateUserInterestsService,
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

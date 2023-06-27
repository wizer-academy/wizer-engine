import { Module } from '@nestjs/common'
import { UUIDProviderImpl } from 'src/shared/providers/uuid-provider/implementations/uuid-provider'
import { UserRegisterService } from './services/register'
import { UserDeleteService } from './services/delete'
import { UserGetService } from './services/get'
import { UserUpdateService } from './services/update'
import { UserGetController } from './controllers/user-get'
import { UserUpdateController } from './controllers/user-update'
import { UserDeleteController } from './controllers/user-delete'
import { UserRegisterController } from './controllers/user-register'
import { UserRepositoryOrmPrisma } from './repositories/implementations/user-repository-orm-prisma'
import { PersistenceModule } from 'src/infra/persistence/persistence.module'
import { UserUploadPhotoController } from './controllers/upload-photo'
import { UploadPhotoService } from './services/upload-photo'
import { UserInterestsAddController } from './controllers/user-interests-add'
import { AddUserInterestsService } from './services/add-user-interests'
import { UpdateInterestsService } from './services/update-interests'

@Module({
  imports: [PersistenceModule],
  controllers: [
    UserGetController,
    UserUpdateController,
    UserDeleteController,
    UserRegisterController,
    UserUploadPhotoController,
    UserInterestsAddController,
  ],
  providers: [
    UserRegisterService,
    UserDeleteService,
    UserGetService,
    UserUpdateService,
    UploadPhotoService,
    AddUserInterestsService,
    UpdateInterestsService,
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

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

@Module({
  imports: [PersistenceModule],
  controllers: [
    UserGetController,
    UserUpdateController,
    UserDeleteController,
    UserRegisterController,
  ],
  providers: [
    UserRegisterService,
    UserDeleteService,
    UserGetService,
    UserUpdateService,
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

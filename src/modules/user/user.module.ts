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
import { PrismaModule } from 'src/infra/database/prisma/prisma.module'
import { UserRepository } from './repositories/implementations/user.repository'

@Module({
  imports: [PrismaModule],
  controllers: [
    UserGetController,
    UserUpdateController,
    UserDeleteController,
    UserRegisterController,
  ],
  providers: [
    UserRepository,
    UserRegisterService,
    UserDeleteService,
    UserGetService,
    UserUpdateService,
    {
      provide: 'UUIDProvider',
      useClass: UUIDProviderImpl,
    },
  ],
  exports: [UserGetService],
})
export class UserModule {}

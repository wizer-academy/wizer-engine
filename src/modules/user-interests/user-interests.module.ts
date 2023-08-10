import { Module } from '@nestjs/common'
import { CreateUserInterestsController } from './controller/create-user-interests.controller'
import { CreateUserInterestsService } from './services/create-user-interests.service'
import { UpdateUserInterestsService } from './services/update-user-interests.service'
import { UserRepositoryOrmPrisma } from '../users/repositories/implementations/user-repository-orm-prisma'
import { PersistenceModule } from 'src/infra/persistence/persistence.module'

@Module({
  imports: [PersistenceModule],
  controllers: [CreateUserInterestsController],
  providers: [
    CreateUserInterestsService,
    UpdateUserInterestsService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryOrmPrisma,
    },
  ],
})
export class UserInterestsModule {}

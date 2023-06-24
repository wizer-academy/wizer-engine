import { Module } from '@nestjs/common'
import { OrmPrisma } from './orms/prisma/orm-prisma.service'

@Module({
  providers: [OrmPrisma],
  exports: [OrmPrisma],
})
export class PersistenceModule {}

import { Module } from '@nestjs/common'
import { UserModule } from './modules/user/user.module'
import { PrismaModule } from './database/prisma/prisma.module'

@Module({
  imports: [UserModule, PrismaModule],
})
export class AppModule {}

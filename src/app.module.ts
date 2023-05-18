import { Module } from '@nestjs/common'
import { UserModule } from './modules/user/user.module'
import { PrismaModule } from './database/prisma/prisma.module'
import { AuthModule } from './modules/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
@Module({
  imports: [UserModule, PrismaModule, AuthModule, ConfigModule.forRoot()],
})
export class AppModule {}

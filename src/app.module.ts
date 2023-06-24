import { Module } from '@nestjs/common'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { SharedModule } from './shared/shared.module'
import { PrismaModule } from './infra/database/prisma/prisma.module'
@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    SharedModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}

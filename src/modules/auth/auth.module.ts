import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { AuthService } from './services/auth.service'
import { UserModule } from '../users/user.module'
import { AuthController } from './controller/auth.controller'
import { AuthGuard } from './guards/auth.guard'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_JWT,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}

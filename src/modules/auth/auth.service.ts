import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/services/user.service'

import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email)

    if (!user) {
      throw new UnauthorizedException('Usuário ou Senha Inválidos')
    }

    const passwordIsValid = await bcrypt.compare(pass, user.password)

    if (!passwordIsValid) {
      throw new UnauthorizedException('Usuário ou Senha Inválidos')
    }

    const payload = {
      email: user.email,
      name: user.name,
      sub: user.id,
    }

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}

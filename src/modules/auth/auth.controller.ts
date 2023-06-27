import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInInput } from './dto/sign-in.dto'
import { Public } from './decorators/public.decorator'
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { SignInOutput } from '../user/dto/sign-in-output.dto'
import { Request } from 'express'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Autentica um usuário
   */
  @Post()
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Obtido com sucesso.',
    type: [SignInOutput],
  })
  @ApiBadRequestResponse({ status: 400, description: 'Requisição invalida.' })
  async signIn(@Body() input: SignInInput): Promise<SignInOutput> {
    const { email, password } = input
    return this.authService.signIn(email, password)
  }

  /**
   * Obtém o perfil do usuário
   */
  @Get('profile')
  @ApiOkResponse({
    description: 'Obtido com sucesso.',
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Requisição invalida.' })
  getProfile(@Req() request: Request) {
    return request.userInfoTokenJWT
  }
}

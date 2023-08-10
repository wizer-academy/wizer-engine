import { Controller, Post, Body } from '@nestjs/common'

import { UserRegistrationInput } from '../dto/user-registration-input.dto'
import { UserRegisterService } from '../services/user-register.service'
import { Public } from 'src/modules/auth/decorators/public.decorator'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger'
import { UserOutput } from '../dto/user-output.dto'

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserRegisterController {
  constructor(private readonly userRegisterService: UserRegisterService) {}

  /**
   * Registar um novo usuário
   */
  @Post('sign-up')
  @Public()
  @ApiCreatedResponse({
    description: 'Usuário registrado com sucesso.',
    type: [UserOutput],
  })
  @ApiConflictResponse({
    description: 'Email já cadastrado.',
  })
  @ApiBadRequestResponse({ description: 'Requisição invalida.' })
  async handle(@Body() input: UserRegistrationInput): Promise<UserOutput> {
    return this.userRegisterService.register(input)
  }
}

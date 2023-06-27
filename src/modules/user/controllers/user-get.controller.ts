import { Controller, Param, Get, ParseUUIDPipe } from '@nestjs/common'

import { UserGetService } from '../services/get-user.service'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { UserOutput } from '../dto/user-output.dto'

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserGetController {
  constructor(private readonly userGetService: UserGetService) {}

  /**
   * Obtém todos os usuários
   */
  @Get()
  @ApiOkResponse({
    description: 'Obtido com sucesso.',
    type: [UserOutput],
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado.',
  })
  async getAll(): Promise<UserOutput[]> {
    return this.userGetService.getAll()
  }

  /**
   * Obtém um usuário pelo id
   */
  @Get(':id')
  @ApiOkResponse({
    description: 'Obtido com sucesso.',
    type: [UserOutput],
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado.',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Requisição invalida.' })
  async getOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserOutput> {
    return this.userGetService.getOne(id)
  }
}

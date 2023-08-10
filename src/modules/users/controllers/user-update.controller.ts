import { Controller, Body, Patch, Param, ParseUUIDPipe } from '@nestjs/common'

import { UserUpdateInput } from '../dto/user-update-input.dto'
import { UserUpdateService } from '../services/update-user.service'
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
export class UserUpdateController {
  constructor(private readonly userUpdateService: UserUpdateService) {}

  /**
   * Atualiza um usuário
   */
  @Patch(':id')
  @ApiOkResponse({
    description: 'Atualização realizada com sucesso.',
    type: [UserOutput],
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado.',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado.',
  })
  @ApiBadRequestResponse({ description: 'Requisição invalida.' })
  async handle(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() input: UserUpdateInput,
  ): Promise<UserOutput> {
    return this.userUpdateService.update(id, input)
  }
}

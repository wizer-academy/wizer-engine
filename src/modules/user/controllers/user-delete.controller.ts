import { Controller, Param, Delete, ParseUUIDPipe } from '@nestjs/common'

import { UserDeleteService } from '../services/delete-user.service'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { UserOutput } from '../dto/user-output.dto'

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserDeleteController {
  constructor(private readonly userDeleteService: UserDeleteService) {}

  /**
   * Exclui um usuário
   */
  @Delete(':id')
  @ApiOkResponse({
    description: 'Exclusão realizada com sucesso.',
    type: [UserOutput],
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Não autorizado.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Requisição invalida.' })
  async handle(@Param('id', ParseUUIDPipe) id: string): Promise<UserOutput> {
    return this.userDeleteService.remove(id)
  }
}

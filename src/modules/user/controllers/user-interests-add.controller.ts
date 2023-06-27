import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { InterestsInput } from '../dto/user-interests.dto'
import { AddUserInterestsService } from '../services/add-user-interests.service'
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
export class UserInterestsAddController {
  constructor(
    private readonly addUserInterestsService: AddUserInterestsService,
  ) {}

  /**
   * Salva os interesses do usuário
   */
  @Post('interests')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Interesses salvos com sucesso.',
    type: [UserOutput],
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado.',
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado.',
  })
  @ApiBadRequestResponse({ description: 'Requisição invalida.' })
  async handle(@Body() input: InterestsInput): Promise<UserOutput> {
    return this.addUserInterestsService.addInterests(input)
  }
}

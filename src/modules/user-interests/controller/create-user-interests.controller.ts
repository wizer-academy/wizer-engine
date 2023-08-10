import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { CreateInterestsInputDto } from '../../users/dto/user-interests.dto'
import { CreateUserInterestsService } from '../services/create-user-interests.service'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { UserOutput } from '../../users/dto/user-output.dto'

@ApiBearerAuth()
@ApiTags('User interests')
@Controller('user')
export class CreateUserInterestsController {
  constructor(
    private readonly createUserInterestsService: CreateUserInterestsService,
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
  async handle(@Body() input: CreateInterestsInputDto): Promise<UserOutput> {
    return this.createUserInterestsService.addInterests(input)
  }
}

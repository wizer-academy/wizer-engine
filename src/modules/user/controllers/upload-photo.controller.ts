import {
  Controller,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express'
import { UploadUserPhotoService } from '../services/upload-user-photo.service'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { UploadOutput } from '../dto/upload-output.dto'
import { FileUploadDto } from '../dto/file-upload.dto'

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserUploadUserPhotoController {
  constructor(
    private readonly uploadUserPhotoService: UploadUserPhotoService,
  ) {}

  /**
   * Faz o upload da foto do usuário
   */
  @Post('upload-photo')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Upload realizado com sucesso.',
  })
  @ApiUnauthorizedResponse({
    description: 'Não autorizado.',
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado.',
  })
  @ApiBadRequestResponse({ description: 'Requisição invalida.' })
  @UseInterceptors(FileInterceptor('photo'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Foto do usuário',
    type: FileUploadDto,
  })
  async handle(
    @Query('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 512000,
          }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
  ): Promise<UploadOutput> {
    return this.uploadUserPhotoService.uploadPhoto(id, file)
  }
}

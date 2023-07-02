import {
  Controller,
  HttpCode,
  HttpStatus,
  ParseFilePipeBuilder,
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
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger'
import { UploadOutput } from '../dto/upload-output.dto'
import { FileUploadSwagger } from '../dto/file-upload.dto'

@ApiBearerAuth()
@ApiTags('Files')
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
  @ApiUnprocessableEntityResponse({
    description: 'Não foi possível processar a requisição.',
  })
  @ApiBadRequestResponse({ description: 'Requisição invalida.' })
  @UseInterceptors(FileInterceptor('photo'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Foto do usuário',
    type: FileUploadSwagger,
  })
  async handle(
    @Query('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })

        .addMaxSizeValidator({
          maxSize: 512000,
          message: 'O arquivo deve ter no máximo 512kb.',
        })
        .build({
          fileIsRequired: true,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ): Promise<UploadOutput> {
    return this.uploadUserPhotoService.uploadPhoto(id, file)
  }
}

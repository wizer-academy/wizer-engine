import {
  Controller,
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
import { UploadPhotoService } from '../services/upload-photo'

@Controller('user')
export class UserUploadPhotoController {
  constructor(private readonly uploadPhotoService: UploadPhotoService) {}

  @Post('upload-photo')
  @UseInterceptors(FileInterceptor('photo'))
  uploadPhoto(
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
  ) {
    return this.uploadPhotoService.uploadPhoto(id, file)
  }
}

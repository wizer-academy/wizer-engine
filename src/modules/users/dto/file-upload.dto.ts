import { ApiProperty } from '@nestjs/swagger'

export class FileUploadSwagger {
  @ApiProperty({ type: 'string', format: 'binary' })
  photo: any
}

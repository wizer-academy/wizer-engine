import { IsNotEmpty, IsString, IsUrl } from 'class-validator'

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsUrl()
  coverUrl: string
}

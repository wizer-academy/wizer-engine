import { ApiProperty, PartialType } from '@nestjs/swagger'
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator'

export class CreateInterestsInputDto {
  @IsString()
  @IsNotEmpty()
  userId: string

  @ApiProperty({
    description: 'O id dos interesses devem ser informados',
    minimum: 1,
    maximum: 3,
    isArray: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(3)
  interests: {
    id: string
  }[]
}

export class UpdateInterestsInputDto extends PartialType(
  CreateInterestsInputDto,
) {}

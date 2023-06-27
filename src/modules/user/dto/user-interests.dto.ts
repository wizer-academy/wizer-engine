import { ApiProperty } from '@nestjs/swagger'
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator'

export class InterestsInput {
  @IsString()
  @IsNotEmpty()
  userId: string

  @ApiProperty({
    description: 'O id dos interesses devem ser informados',
    minimum: 1,
    maximum: 3,
    isArray: true,
    default: [
      {
        id: '19c801066-a5e4-4e24-936d-9d708468e7cf',
      },
      {
        id: '3b9d7079-a962-46ce-934c-566ad3d6b693',
      },
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(3)
  interests: {
    id: string
  }[]
}

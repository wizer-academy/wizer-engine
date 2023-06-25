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

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(3)
  interests: {
    id: string
  }[]
}

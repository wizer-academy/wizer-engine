import { Controller, Post, Body } from '@nestjs/common'
import { InterestsInput } from '../dto/user-interests'
import { AddInterestsService } from '../services/add-interests'

@Controller('user')
export class InterestsAddController {
  constructor(private readonly addInterestsService: AddInterestsService) {}

  @Post('interests')
  addInterests(@Body() input: InterestsInput) {
    return this.addInterestsService.addInterests(input)
  }
}

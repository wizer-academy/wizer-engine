import { Controller, Post, Body } from '@nestjs/common'
import { InterestsInput } from '../dto/user-interests'
import { AddUserInterestsService } from '../services/add-user-interests'

@Controller('user')
export class UserInterestsAddController {
  constructor(
    private readonly addUserInterestsService: AddUserInterestsService,
  ) {}

  @Post('interests')
  addInterests(@Body() input: InterestsInput) {
    return this.addUserInterestsService.addInterests(input)
  }
}

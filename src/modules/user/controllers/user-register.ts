import { Controller, Post, Body } from '@nestjs/common'

import { UserRegistrationInput } from '../dto/user-registration-input'
import { UserRegisterService } from '../services/register'

@Controller('user')
export class UserRegisterController {
  constructor(private readonly userRegisterService: UserRegisterService) {}

  @Post()
  create(@Body() input: UserRegistrationInput) {
    return this.userRegisterService.register(input)
  }
}

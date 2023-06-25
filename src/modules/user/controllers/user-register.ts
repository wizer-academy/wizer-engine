import { Controller, Post, Body } from '@nestjs/common'

import { UserRegistrationInput } from '../dto/user-registration-input'
import { UserRegisterService } from '../services/register'
import { Public } from 'src/modules/auth/decorators/public.decorator'

@Controller('user')
export class UserRegisterController {
  constructor(private readonly userRegisterService: UserRegisterService) {}

  @Public()
  @Post()
  create(@Body() input: UserRegistrationInput) {
    return this.userRegisterService.register(input)
  }
}

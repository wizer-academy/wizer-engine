import { Controller, Body, Patch, Param } from '@nestjs/common'

import { UserUpdateInput } from '../dto/user-update-input'
import { UserUpdateService } from '../services/update'

@Controller('user')
export class UserUpdateController {
  constructor(private readonly userUpdateService: UserUpdateService) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UserUpdateInput) {
    return this.userUpdateService.update(id, input)
  }
}
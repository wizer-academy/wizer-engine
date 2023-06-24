import { Controller, Param, Delete } from '@nestjs/common'

import { UserDeleteService } from '../services/delete'

@Controller('user')
export class UserDeleteController {
  constructor(private readonly userDeleteService: UserDeleteService) {}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userDeleteService.remove(id)
  }
}

import { Controller, Param, Delete, ParseUUIDPipe } from '@nestjs/common'

import { UserDeleteService } from '../services/delete'

@Controller('user')
export class UserDeleteController {
  constructor(private readonly userDeleteService: UserDeleteService) {}

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userDeleteService.remove(id)
  }
}

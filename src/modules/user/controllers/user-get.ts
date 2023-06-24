import { Controller, Param, Get } from '@nestjs/common'

import { UserGetService } from '../services/get'

@Controller('user')
export class UserGetController {
  constructor(private readonly userGetService: UserGetService) {}

  @Get()
  findAll() {
    return this.userGetService.getAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userGetService.getOne(id)
  }
}

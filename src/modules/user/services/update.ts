import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import * as bcrypt from 'bcrypt'
import { UserUpdateInput } from '../dto/user-update-input'
import { UserRepository } from '../repositories/contracts/user-repository'

@Injectable()
export class UserUpdateService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  private async checkUserExists(id: string): Promise<void> {
    const existsUser = await this.userRepository.getById(id)
    if (!existsUser) {
      throw new NotFoundException('O usuário não existe na base de dados.')
    }
  }

  async update(id: string, input: UserUpdateInput) {
    await this.checkUserExists(id)

    let { email, name, password } = input

    if (password) {
      password = await bcrypt.hash(password, 10)
    }

    return await this.userRepository.update(id, {
      email,
      name,
      password,
    })
  }
}

import { Injectable, NotFoundException } from '@nestjs/common'
import { UserRepository } from '../repositories/implementations/user.repository'

@Injectable()
export class UserGetService {
  constructor(private readonly userRepository: UserRepository) {}

  private async checkUserExists(id: string): Promise<void> {
    const existsUser = await this.userRepository.getById(id)
    if (!existsUser) {
      throw new NotFoundException('O usuário não existe na base de dados.')
    }
  }

  async getAll() {
    return await this.userRepository.getAll()
  }

  async getOne(id: string) {
    await this.checkUserExists(id)
    return await this.userRepository.getById(id)
  }

  async getOneByEmail(email: string) {
    return await this.userRepository.findByEmail(email)
  }
}

import { Injectable, NotFoundException } from '@nestjs/common'
import { UserRepository } from '../repositories/implementations/user.repository'

@Injectable()
export class UserDeleteService {
  constructor(private readonly userRepository: UserRepository) {}

  private async checkUserExists(id: string): Promise<void> {
    const existsUser = await this.userRepository.getById(id)
    if (!existsUser) {
      throw new NotFoundException('O usuário não existe na base de dados.')
    }
  }

  async remove(id: string) {
    await this.checkUserExists(id)

    return await this.userRepository.delete(id)
  }
}

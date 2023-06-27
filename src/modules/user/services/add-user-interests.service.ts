import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { UserRepository } from '../repositories/contracts/user-repository'
import { InterestsInput } from '../dto/user-interests.dto'

@Injectable()
export class AddUserInterestsService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async addInterests(input: InterestsInput) {
    const { userId, interests } = input

    await this.validateUserAndInterestsExists(userId, interests)

    for (const interest of interests) {
      const { id } = interest
      await this.userRepository.addInterests(userId, id)
    }

    return await this.userRepository.getById(userId)
  }

  async validateUserAndInterestsExists(
    userId: string,
    interests: { id: string }[],
  ): Promise<void> {
    const existsUser = await this.userRepository.getById(userId)

    if (!existsUser) {
      throw new NotFoundException('User not found')
    }

    for (const interest of interests) {
      const { id } = interest
      const existsInterest = await this.userRepository.existsInterest(id)

      if (!existsInterest) {
        throw new NotFoundException('Interest not found')
      }
    }
  }
}

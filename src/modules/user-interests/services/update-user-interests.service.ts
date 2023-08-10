import { Inject, Injectable, NotFoundException } from '@nestjs/common'

import { UserRepository } from '../../users/repositories/contracts/user-repository'
import { UpdateInterestsInputDto } from '../../users/dto/user-interests.dto'

@Injectable()
export class UpdateUserInterestsService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async updateInterests(input: UpdateInterestsInputDto) {
    const { userId, interests } = input

    await this.validateIfUserAndInterestsExist(userId, interests)

    for (const interest of interests) {
      const { id } = interest
      await this.userRepository.updateInterests(userId, id)
    }

    return await this.userRepository.getById(userId)
  }

  async validateIfUserAndInterestsExist(
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

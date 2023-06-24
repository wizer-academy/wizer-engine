import { Injectable } from '@nestjs/common'
import { UserRepositoryContract } from '../contracts/user-repository'
import { UserRegistrationInput } from '../../dto/user-registration-input'
import { UserUpdateInput } from '../../dto/user-update-input'
import { UserOutput } from '../../dto/user-output'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

@Injectable()
export class UserRepository implements UserRepositoryContract {
  constructor(private readonly prismaService: PrismaService) {}

  async save(input: UserRegistrationInput) {
    return await this.prismaService.user.create({
      data: input,
    })
  }

  async getAll(): Promise<UserOutput[]> {
    return await this.prismaService.user.findMany()
  }

  async getById(id: string): Promise<UserOutput | null> {
    return await this.prismaService.user.findFirst({
      where: {
        id,
      },
    })
  }

  async update(id: string, userInput: UserUpdateInput): Promise<UserOutput> {
    return await this.prismaService.user.update({
      data: userInput,
      where: {
        id,
      },
    })
  }

  async delete(id: string): Promise<UserOutput> {
    return await this.prismaService.user.delete({
      where: {
        id,
      },
    })
  }

  async findByEmail(email: string): Promise<UserOutput | null> {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    })
  }
}

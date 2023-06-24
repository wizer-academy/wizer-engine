import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { UserRepositoryContract } from '../contracts/user-repository'
import { CreateUserDto } from '../dto/create-user.dto'
import { User } from '../entities/user.entity'
import { UpdateUserDto } from '../dto/update-user.dto'

@Injectable()
export class UserRepository implements UserRepositoryContract {
  constructor(private readonly prismaService: PrismaService) {}

  async save(userInput: CreateUserDto) {
    return await this.prismaService.user.create({
      data: userInput,
    })
  }

  async getAll(): Promise<User[]> {
    return await this.prismaService.user.findMany()
  }

  async getById(id: string): Promise<User | null> {
    return await this.prismaService.user.findFirst({
      where: {
        id,
      },
    })
  }

  async update(id: string, userInput: UpdateUserDto): Promise<User> {
    return await this.prismaService.user.update({
      data: userInput,
      where: {
        id,
      },
    })
  }

  async delete(userId: string): Promise<User> {
    return await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    })
  }
}

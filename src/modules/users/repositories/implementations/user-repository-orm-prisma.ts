import { Injectable } from '@nestjs/common'
import { UserRepository } from '../contracts/user-repository'
import { UserRegistrationInput } from '../../dto/user-registration-input.dto'
import { UserUpdateInput } from '../../dto/user-update-input.dto'

import { OrmPrisma } from 'src/infra/persistence/orms/prisma/orm-prisma.service'

import { UserAdapter } from '../adapters/user-adapter'
import { UserOutput } from '../../dto/user-output.dto'
import { UserModel } from '../adapters/user-model'

@Injectable()
export class UserRepositoryOrmPrisma implements UserRepository {
  constructor(private readonly ormPrisma: OrmPrisma) {}

  async save(input: UserRegistrationInput): Promise<UserOutput> {
    const user = await this.ormPrisma.user.create({
      data: input,
    })
    return UserAdapter.toDomain(user)
  }

  async getAll(): Promise<UserOutput[] | null> {
    const users = await this.ormPrisma.user.findMany({
      include: {
        interests: true,
      },
    })

    if (!users) {
      return
    }

    return UserAdapter.toDomainList(users)
  }

  async getById(id: string): Promise<UserOutput | null> {
    const user = await this.ormPrisma.user.findFirst({
      where: {
        id,
      },
      include: {
        interests: true,
      },
    })

    if (!user) {
      return
    }

    return UserAdapter.toDomain(user)
  }

  async update(id: string, userInput: UserUpdateInput): Promise<UserOutput> {
    const user = await this.ormPrisma.user.update({
      data: userInput,
      where: {
        id,
      },
    })

    return UserAdapter.toDomain(user)
  }

  async delete(id: string): Promise<UserOutput> {
    const user = await this.ormPrisma.user.delete({
      where: {
        id,
      },
    })
    return UserAdapter.toDomain(user)
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const user = await this.ormPrisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return
    }

    return user
  }

  async updatePhoto(id: string, photoUrl: string): Promise<UserOutput> {
    const user = await this.ormPrisma.user.update({
      data: {
        profile_url: photoUrl,
      },
      where: {
        id,
      },
    })

    return UserAdapter.toDomain(user)
  }

  async addInterests(id: string, interestsId: string) {
    return await this.ormPrisma.user.update({
      where: {
        id,
      },
      data: {
        interests: {
          connect: {
            id: interestsId,
          },
        },
      },
    })
  }

  async updateInterests(id: string, interestsId: string) {
    await this.getById(id)

    await this.ormPrisma.user.update({
      where: {
        id,
      },
      data: {
        interests: {
          set: {
            id: interestsId,
          },
        },
      },
    })

    return await this.getById(id)
  }

  async existsInterest(id: string) {
    return await this.ormPrisma.interest.findUnique({
      where: {
        id,
      },
    })
  }
}

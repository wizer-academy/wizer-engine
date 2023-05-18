import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import * as bcrypt from 'bcrypt'
import { UserRepository } from '../repository/user.repository'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private async checkUserExists(id: string): Promise<void> {
    const existsUser = await this.userRepository.getById(id)
    if (!existsUser) {
      throw new NotFoundException('O usuário não existe na base de dados.')
    }
  }

  async create(createUserDto: CreateUserDto) {
    let { email, name, password } = createUserDto

    const exitsEmail = await this.userRepository.findByEmail(email)

    if (exitsEmail) {
      throw new ConflictException('Email já existe no sistema.')
    }

    password = await bcrypt.hash(password, 10)

    const userSaved = await this.userRepository.save({
      email,
      name,
      password,
    })

    return userSaved
  }

  async findAll() {
    return await this.userRepository.getAll()
  }

  async findOne(id: string) {
    await this.checkUserExists(id)
    return await this.userRepository.getById(id)
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findByEmail(email)
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.checkUserExists(id)

    let { email, name, password } = updateUserDto

    if (password) {
      password = await bcrypt.hash(password, 10)
    }

    return await this.userRepository.update(id, {
      email,
      name,
      password,
    })
  }

  async remove(id: string) {
    await this.checkUserExists(id)

    return await this.userRepository.delete(id)
  }
}

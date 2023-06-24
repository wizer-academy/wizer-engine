import { ConflictException, Inject, Injectable } from '@nestjs/common'

import * as bcrypt from 'bcrypt'
import { UserRegistrationInput } from '../dto/user-registration-input'
import { User } from '../entities/user.entity'
import { UserRepository } from '../repositories/implementations/user.repository'
import { UUIDProvider } from 'src/shared/providers/uuid-provider/contract/uuid-provider'

@Injectable()
export class UserRegisterService {
  constructor(
    private readonly userRepository: UserRepository,

    @Inject('UUIDProvider')
    private readonly uuidProvider: UUIDProvider,
  ) {}

  async register(input: UserRegistrationInput) {
    let { email, name, password } = input

    const exitsEmail = await this.userRepository.findByEmail(email)

    if (exitsEmail) {
      throw new ConflictException('Email já existe no sistema.')
    }

    password = await bcrypt.hash(password, 10)

    const id = this.uuidProvider.generateUUID()

    const user = new User({ id, email, name, password })

    const output = await this.userRepository.save(user.props)

    return {
      id: output.id,
      name: output.name,
      email: output.email,
    }
  }
}

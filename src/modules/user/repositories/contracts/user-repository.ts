import { UserOutput } from '../../dto/user-output'
import { UserRegistrationInput } from '../../dto/user-registration-input'
import { UserUpdateInput } from '../../dto/user-update-input'
import { UserModel } from '../adapters/user-model'

export interface UserRepository {
  save: (input: UserRegistrationInput) => Promise<UserOutput>
  getAll: () => Promise<UserOutput[] | null>
  getById: (id: string) => Promise<UserOutput | null>
  update: (id: string, input: UserUpdateInput) => Promise<UserOutput>
  delete: (id: string) => Promise<UserOutput>
  findByEmail: (email: string) => Promise<UserModel | null>
}

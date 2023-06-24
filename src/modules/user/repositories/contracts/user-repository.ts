import { UserRegistrationInput } from '../../dto/user-registration-input'
import { UserUpdateInput } from '../../dto/user-update-input'
import { UserOutput } from '../../dto/user-output'

export interface UserRepositoryContract {
  save: (input: UserRegistrationInput) => Promise<UserOutput>
  getAll: () => Promise<UserOutput[]>
  getById: (id: string) => Promise<UserOutput | null>
  update: (id: string, input: UserUpdateInput) => Promise<UserOutput>
  delete: (id: string) => Promise<UserOutput>
  findByEmail: (email: string) => Promise<UserOutput | null>
}

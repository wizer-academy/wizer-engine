import { UserOutput } from '../../dto/user-output.dto'
import { UserRegistrationInput } from '../../dto/user-registration-input.dto'
import { UserUpdateInput } from '../../dto/user-update-input.dto'
import { UserModel } from '../adapters/user-model'

export interface UserRepository {
  save: (input: UserRegistrationInput) => Promise<UserOutput>
  getAll: () => Promise<UserOutput[] | null>
  getById: (id: string) => Promise<UserOutput | null>
  update: (id: string, input: UserUpdateInput) => Promise<UserOutput>
  delete: (id: string) => Promise<UserOutput>
  findByEmail: (email: string) => Promise<UserModel | null>
  updatePhoto(id: string, photoUrl: string): Promise<UserOutput>
  addInterests(id: string, interestsId: string)
  updateInterests(id: string, interestsId: string)
  existsInterest(id: string)
}

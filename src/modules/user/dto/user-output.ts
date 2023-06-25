import { Interests } from '../repositories/adapters/user-model'

export type UserOutput = {
  id: string
  email: string
  name: string
  urlProfile?: string
  interests?: Interests[]
}

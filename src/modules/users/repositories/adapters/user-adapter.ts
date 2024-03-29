import { UserOutput } from '../../dto/user-output.dto'
import { UserModel } from './user-model'

export class UserAdapter {
  static toDomainList(user: UserModel[]): UserOutput[] {
    return user.map((user) => this.toDomain(user))
  }

  static toDomain(user: UserModel): UserOutput {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      urlProfile: user.profile_url || null,
      interests: user.interests || [],
    }
  }
}

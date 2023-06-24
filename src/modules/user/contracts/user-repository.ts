import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { User } from '../entities/user.entity'

export interface UserRepositoryContract {
  save: (customerInput: CreateUserDto) => Promise<User>
  getAll: () => Promise<User[]>
  getById: (id: string) => Promise<User | null>
  update: (id: string, customerInput: UpdateUserDto) => Promise<User>
  delete: (customerId: string) => Promise<User>
  findByEmail: (email: string) => Promise<User | null>
}

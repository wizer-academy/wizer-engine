import { PartialType } from '@nestjs/mapped-types'
import { UserRegistrationInput } from './user-registration-input'

export class UserUpdateInput extends PartialType(UserRegistrationInput) {}

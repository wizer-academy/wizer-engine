import { PartialType } from '@nestjs/swagger'
import { UserRegistrationInput } from './user-registration-input.dto'

export class UserUpdateInput extends PartialType(UserRegistrationInput) {}

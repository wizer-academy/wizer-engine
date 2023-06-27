import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class SignInInput {
  /**
   * Email de um usuário registrado
   * @example johnson.doe@email.com
   */
  @IsEmail()
  email: string

  /**
   * Senha de um usuário registrado
   * @example 123456789
   */
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string
}

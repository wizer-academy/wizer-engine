import { Interest, User } from '@prisma/client'

type InterestsModel = Interest

export type UserModel = User & {
  interests?: InterestsModel[]
}

export type Interests = {
  id: string
  name: string
}

export type UserModel = {
  id: string
  email: string
  password: string
  name: string
  profile_url?: string
  interests?: Interests[]
}

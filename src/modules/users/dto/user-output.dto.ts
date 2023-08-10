type Interests = {
  id: string
  name: string
}

export class UserOutput {
  id: string
  email: string
  name: string
  urlProfile?: string
  interests?: Interests[]
}

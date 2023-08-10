export class CourseOutput {
  id: number
  title: string
  description: string
  coverUrl: string
  createdAt: Date
  updatedAt: Date
}

class Lesson {
  id: number
  title: string
  content: string

  videoUrl: string

  createdAt: Date
  updatedAt: Date
}

export class CourseDetailOutput {
  id: number
  title: string
  description: string
  coverUrl: string
  createdAt: Date
  updatedAt: Date

  lessons?: Lesson[]
}

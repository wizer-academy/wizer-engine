type CourseProps = {
  id?: number
  title: string
  description: string
  coverUrl: string
  createdAt?: Date
  updatedAt?: Date
}

export class Course {
  private constructor(public props: CourseProps) {}

  static create(props: CourseProps): Course {
    return new Course(props)
  }
}

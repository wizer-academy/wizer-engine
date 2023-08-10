import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCourseDto } from '../dto/create-course.dto'
import { UpdateCourseDto } from '../dto/update-course.dto'
import { OrmPrisma } from 'src/infra/persistence/orms/prisma/orm-prisma.service'
import { CourseOutput, CourseDetailOutput } from '../dto/course-output.dto'
import { Course } from '../entities/course.entity'

@Injectable()
export class CoursesService {
  constructor(private readonly ormPrisma: OrmPrisma) {}

  create(createCourseDto: CreateCourseDto): Promise<CourseOutput> {
    const { coverUrl, description, title } = createCourseDto

    const course = Course.create({
      coverUrl,
      description,
      title,
    })

    const output = this.ormPrisma.course.create({
      data: {
        coverUrl: course.props.coverUrl,
        description: course.props.description,
        title: course.props.title,
      },
    })

    return output
  }

  async findAll(): Promise<CourseOutput[]> {
    const courses = await this.ormPrisma.course.findMany({
      select: {
        coverUrl: true,
        createdAt: true,
        description: true,
        id: true,
        title: true,
        updatedAt: true,
      },
    })

    return courses
  }

  async findOne(id: number): Promise<CourseDetailOutput> {
    const course = await this.ormPrisma.course.findUnique({
      where: { id },
      select: {
        coverUrl: true,
        createdAt: true,
        description: true,
        id: true,
        title: true,
        updatedAt: true,
        lessons: {
          select: {
            content: true,
            createdAt: true,
            id: true,
            title: true,
            updatedAt: true,
            videoUrl: true,
          },
        },
      },
    })

    if (!course) {
      throw new NotFoundException('Course not found')
    }

    return course
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const { coverUrl, description, title } = updateCourseDto

    await this.findOne(id)

    const course = this.ormPrisma.course.update({
      where: { id },
      data: {
        coverUrl,
        description,
        title,
      },
    })

    return course
  }

  async remove(id: number) {
    await this.findOne(id)

    const course = this.ormPrisma.course.delete({
      where: { id },
    })

    return course
  }
}

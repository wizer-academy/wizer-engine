import { Module } from '@nestjs/common'
import { CoursesController } from './controllers/courses.controller'
import { CoursesService } from './services/courses.service'
import { PersistenceModule } from 'src/infra/persistence/persistence.module'

@Module({
  imports: [PersistenceModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}

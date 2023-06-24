import { Test, TestingModule } from '@nestjs/testing'
import { OrmPrisma } from './orm-prisma.service'

describe('PrismaService', () => {
  let service: OrmPrisma

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrmPrisma],
    }).compile()

    service = module.get<OrmPrisma>(OrmPrisma)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

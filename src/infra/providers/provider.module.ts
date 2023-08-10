import { Module } from '@nestjs/common'
import { UUIDProviderImpl } from './uuid-provider/implementations/uuid-provider'

@Module({
  providers: [UUIDProviderImpl],
  exports: [UUIDProviderImpl],
})
export class ProviderModule {}

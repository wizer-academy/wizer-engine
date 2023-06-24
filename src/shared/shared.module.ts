import { Global, Module } from '@nestjs/common'
import { UUIDProviderImpl } from './providers/uuid-provider/implementations/uuid-provider'

@Global()
@Module({
  providers: [UUIDProviderImpl],
  exports: [UUIDProviderImpl],
})
export class SharedModule {}

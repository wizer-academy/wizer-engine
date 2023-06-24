import { Global, Module } from '@nestjs/common'
import { UUIDProvider } from './providers/uuid-provider/implementations/uuid-provider'

@Global()
@Module({
  providers: [UUIDProvider],
  exports: [UUIDProvider],
})
export class SharedModule {}

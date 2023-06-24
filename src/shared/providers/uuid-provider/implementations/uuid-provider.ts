import { v4 as uuidv4 } from 'uuid'
import { UUIDProviderContract } from '../contract/uuid-provider'

export class UUIDProvider implements UUIDProviderContract {
  generateId(): string {
    return uuidv4()
  }
}

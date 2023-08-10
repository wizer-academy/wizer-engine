import { v4 as uuidv4 } from 'uuid'
import { UUIDProvider } from '../contract/uuid-provider'

export class UUIDProviderImpl implements UUIDProvider {
  generateUUID(): string {
    return uuidv4()
  }
}

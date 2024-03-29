import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

import firebase, { ServiceAccount } from 'firebase-admin'
import { UserRepository } from '../repositories/contracts/user-repository'
import { Express } from 'express'
import { UploadOutput } from '../dto/upload-output.dto'
import { UUIDProvider } from 'src/infra/providers/uuid-provider/contract/uuid-provider'

const firebaseCredentials: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
}

const bucket = firebase
  .initializeApp({
    credential: firebase.credential.cert(firebaseCredentials),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  })
  .storage()
  .bucket()

@Injectable()
export class UploadUserPhotoService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,

    @Inject('UUIDProvider')
    private readonly uuidProvider: UUIDProvider,
  ) {}

  async uploadPhoto(id, file: Express.Multer.File): Promise<UploadOutput> {
    const existsUser = await this.userRepository.getById(id)
    if (!existsUser) {
      throw new NotFoundException('O usuário não existe na base de dados.')
    }

    if (!file) {
      throw new NotFoundException('O arquivo não foi enviado.')
    }

    const { originalname, buffer } = file
    const fileName =
      this.uuidProvider.generateUUID() + '.' + originalname.split('.').pop()

    const fileUpload = bucket.file('users-profiles/' + fileName)

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    })

    stream.on('error', (err) => {
      throw new InternalServerErrorException(err)
    })

    const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`

    stream.on('finish', async () => {
      await fileUpload.makePublic()

      await this.userRepository.updatePhoto(id, url)
    })

    stream.end(buffer)

    return {
      url,
    }
  }
}

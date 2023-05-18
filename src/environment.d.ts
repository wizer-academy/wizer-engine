declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_JWT: string
    }
  }
}

export {}

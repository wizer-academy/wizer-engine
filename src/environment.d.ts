declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_JWT: string
      FIREBASE_PROJECT_ID: string
      FIREBASE_CLIENT_EMAIL: string
      FIREBASE_PRIVATE_KEY: string
    }
  }

  namespace Express {
    interface Request {
      userInfoTokenJWT: {
        email: string
        name: string
        sub: string
        iat: number
        exp: number
      }
    }
  }
}

export {}

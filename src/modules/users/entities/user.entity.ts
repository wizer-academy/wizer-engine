type UserProps = {
  id: string
  email: string
  password: string
  name: string
  profile_url?: string
}

export class User {
  constructor(public props: UserProps) {
    this.validateEmail()
    this.validatePassword()
    this.validateName()
    this.validateUniqueId()
  }

  private validateEmail() {
    if (!this.props.email) {
      throw new Error('Email is required.')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(this.props.email)) {
      throw new Error('Invalid email format.')
    }
  }

  private validatePassword() {
    if (!this.props.password) {
      throw new Error('Password is required.')
    }

    if (this.props.password.length < 8) {
      throw new Error('Password must have at least 8 characters.')
    }
  }

  private validateName() {
    if (!this.props.name) {
      throw new Error('Name is required.')
    }

    if (this.props.name.trim().length === 0) {
      throw new Error('Name cannot be empty.')
    }
  }

  private validateUniqueId() {
    if (!this.props.id) {
      throw new Error('ID is required.')
    }
  }
}

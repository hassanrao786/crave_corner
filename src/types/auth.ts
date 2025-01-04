// src/types/auth.ts
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm extends LoginForm {
  name: string
}

export interface AuthResponse {
  success: boolean
  message: string
  token?: string
}

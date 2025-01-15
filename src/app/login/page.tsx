// src/app/login/page.tsx
'use client'

import LoginForm from '../../app/components/auth/LoginForm'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl text-orange-500 font-bold text-center">Login</h2>
        <LoginForm />
        <p className="text-center">
          Dont have an account?
          <Link href="/register" className="text-blue-500 hover:text-orange-600">
            Register
          </Link> 
        </p>
      </div>
    </div>
  )
}

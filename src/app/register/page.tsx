// src/app/register/page.tsx
'use client'

import RegisterForm from '../../app/components/auth/RegisterForm'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl text-orange-500 font-bold text-center">Register</h2>
        <RegisterForm />
        <p className="text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:text-orange-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

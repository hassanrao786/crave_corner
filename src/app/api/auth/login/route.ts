// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import clientPromise from '../../../../lib/mongodb'
import { signToken } from '../../../../lib/jwt'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    const client = await clientPromise
    const db = client.db()

    // Find user
    const user = await db.collection('users').findOne({ email })

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate JWT
    const token = signToken({ userId: user._id.toString() })

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      token
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Login failed' },
      { status: 500 }
    )
  }
}

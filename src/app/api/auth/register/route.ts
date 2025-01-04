// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import clientPromise from '../../../../lib/mongodb'
import { signToken } from '../../../../lib/jwt'

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()
    const client = await clientPromise
    const db = client.db()

    // Check if user exists
    const existingUser = await db.collection('users').findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const result = await db.collection('users').insertOne({
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    // Generate JWT
    const token = signToken({ userId: result.insertedId.toString() })

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      token
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, message: 'Registration failed' },
      { status: 500 }
    )
  }
}


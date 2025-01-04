// src/lib/auth.ts
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import clientPromise from './mongodb'
import { ObjectId } from 'mongodb'

interface JWTPayload {
  userId: string
}

export async function verifyAuth(request: Request) {
  try {
    // Get token from Authorization header
    const authorization = request.headers.get('authorization')
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return null
    }

    const token = authorization.split(' ')[1]
    if (!token) {
      return null
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
    if (!decoded.userId) {
      return null
    }

    // Get user from database
    const client = await clientPromise
    const db = client.db()
    
    const user = await db.collection('users').findOne({
      _id: new ObjectId(decoded.userId)
    })

    if (!user) {
      return null
    }

    return user
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}

// Alternative version that also accepts token from cookies or query params
export async function verifyAuthWithMultipleSources(request: Request) {
  try {
    // Try Authorization header first
    const authorization = request.headers.get('authorization')
    let token: string | null = null

    if (authorization && authorization.startsWith('Bearer ')) {
      token = authorization.split(' ')[1]
    }

    // If no token in header, try cookies
    if (!token) {
      const cookies = request.headers.get('cookie')
      if (cookies) {
        const tokenCookie = cookies.split(';').find(c => c.trim().startsWith('token='))
        if (tokenCookie) {
          token = tokenCookie.split('=')[1]
        }
      }
    }

    // If still no token, check URL params
    if (!token) {
      const url = new URL(request.url)
      token = url.searchParams.get('token')
    }

    if (!token) {
      return null
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
    if (!decoded.userId) {
      return null
    }

    // Get user from database
    const client = await clientPromise
    const db = client.db()
    
    const user = await db.collection('users').findOne({
      _id: new ObjectId(decoded.userId)
    })

    if (!user) {
      return null
    }

    return user
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}

// Helper function to generate JWT token
export function generateToken(userId: string) {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )
}

// Middleware to protect API routes
export async function authMiddleware(request: Request) {
  const user = await verifyAuth(request)
  
  if (!user) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  return user
}

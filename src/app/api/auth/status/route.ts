// src/app/api/auth/status/route.ts
import { NextResponse } from 'next/server';
import { verifyToken } from '../../../../lib/jwt'; // Assuming you have a function to verify token

export async function GET(req: Request) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', ''); // Extract the token from Authorization header

  if (!token) {
    return NextResponse.json(
      { isAuthenticated: false },
      { status: 401 }
    );
  }

  const user = verifyToken(token);

  if (user) {
    return NextResponse.json({
      isAuthenticated: true,
      user: user
    });
  }

  return NextResponse.json(
    { isAuthenticated: false },
    { status: 401 }
  );
}

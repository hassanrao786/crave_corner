// /api/admin/login
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'; // For password hashing 
import { signToken } from '@/lib/jwt'; // Import your JWT utility functions
import clientPromise from '@/lib/mongodb'; 

export async function POST(request: Request) { 
  try {
    const { email, password } = await request.json(); 
    const client = await clientPromise; 
    const db = client.db();

    const admin = await db.collection('admins').findOne({ email }); 

    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 } 
      );
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = signToken({ adminId: admin._id.toString() }); 

    // Set token as an HTTP-only cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('token', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict', // Prevent CSRF attacks
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/admin' // Make the cookie accessible only within the /admin route
    });

    return response;
  } catch (error) {
    console.error('Login Error:', error); 
    return NextResponse.json({ success: false, message: 'An error occurred' }, { status: 500 });
  }
}

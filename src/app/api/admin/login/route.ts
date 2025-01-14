import { signToken } from "@/lib/jwt";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function POST(request: Request) { 
  try {
    const { email, password } = await request.json(); 
    console.log('Received login request for:', email);

    const client = await clientPromise; 
    const db = client.db('cravecorner');
    const admin = await db.collection('admins').findOne({ email }); 


    if (!admin) {
      console.error('Admin not found for email:', email);
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 } 
      );
    }

    console.log('Admin found:', admin);

    const isValidPassword = await bcrypt.compare(password, admin.password);
    console.log('Password match result:', isValidPassword);

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = signToken({ adminId: admin._id.toString() }); 
    console.log('Token generated successfully:', token);

    const response = NextResponse.json({ success: true });
    response.cookies.set('token', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, 
      path: '/admin'
    });

    console.log('Login successful for email:', email);
    return response;
  } catch (error) {
    console.error('Login Error:', error); 
    return NextResponse.json({ success: false, message: 'An error occurred' }, { status: 500 });
  }
}

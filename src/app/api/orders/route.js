import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; // MongoDB client
import { verifyToken } from '@/lib/jwt'; // JWT verification

// Handle POST request (Place an Order)
export async function POST(request) {
  try {
    const body = await request.json();
    const { recipeId, name, phoneNumber, address, price } = body;

    if (!recipeId || !name || !phoneNumber || !address || !price) {
      return new Response(JSON.stringify({ message: 'Invalid input.' }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('cravecorner');

    const result = await db.collection('orders').insertOne({
      recipeId,
      name,
      phoneNumber,
      address,
      price,
      status: 'Pending',
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ message: 'Order placed successfully.', orderId: result.insertedId }), {
      status: 201,
    });
  } catch (error) {
    console.error('Error placing order:', error);
    return new Response(JSON.stringify({ message: 'Failed to place order.' }), { status: 500 });
  }
}

// Handle GET request (Fetch all Orders)
export async function GET(req) {
  try {
    // Extract token from Authorization header
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Verify the token
    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // MongoDB connection
    const client = await clientPromise;
    const db = client.db('cravecorner');

    // Assuming the user has a userId field to fetch their orders
    const orders = await db.collection('orders').find({ userId: user.userId }).toArray();

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ message: 'Failed to fetch orders' }, { status: 500 });
  }
}

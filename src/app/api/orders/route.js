import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  try {
    console.log('Incoming POST request...');

    const body = await req.json();
    console.log('Request payload:', body);

    const { recipeId, recipeName, customerName, customerAddress } = body;

    // Validate input fields
    if (!recipeId || !recipeName || !customerName || !customerAddress) {
      console.warn('Validation failed: Missing required fields', body);
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('cravecorner');

    const newOrder = {
      recipeId,
      recipeName,
      customerName,
      customerAddress,
      status: 'pending',
      createdAt: new Date(),
    };

    const result = await db.collection('orders').insertOne(newOrder);

    console.log('Order inserted successfully:', result.insertedId);

    return new Response(
      JSON.stringify({ message: 'Order placed successfully', orderId: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in API:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}

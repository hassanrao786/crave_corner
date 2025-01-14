import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  const client = await clientPromise;
  const db = client.db('crave_corner');
  const { recipeId } = await req.json();

  const order = await db.collection('orders').insertOne({
    recipeId,
    status: 'Pending',
    createdAt: new Date(),
  });

  return new Response(JSON.stringify(order), { status: 201 });
}

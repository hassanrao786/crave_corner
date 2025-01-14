import clientPromise from '@/lib/mongodb';

export async function GET() {
  const client = await clientPromise;
  const db = client.db('crave_corner'); // Replace with your database name
  const recipes = await db.collection('recipes').find().toArray();

  return new Response(JSON.stringify(recipes), { status: 200 });
}

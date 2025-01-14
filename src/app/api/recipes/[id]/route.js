import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
  const client = await clientPromise;
  const db = client.db('crave_corner');
  const recipe = await db.collection('recipes').findOne({ _id: new ObjectId(params.id) });

  if (!recipe) return new Response('Recipe not found', { status: 404 });
  return new Response(JSON.stringify(recipe), { status: 200 });
}

import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(req: Request): Promise<Response> {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Extract ID from the URL path

    if (!id || !ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: 'Invalid ID parameter.' }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('crave_corner');

    const result = await db.collection('recipes').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: 'Recipe not found or already deleted.' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Recipe deleted successfully.' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return new Response(JSON.stringify({ message: 'Failed to delete recipe.' }), { status: 500 });
  }
}

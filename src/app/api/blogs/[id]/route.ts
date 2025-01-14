import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { id } = await context.params; // Await the params

    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: 'Invalid ID.' }), { status: 400 });
    }

    const blog = await db.collection('blogs').findOne({ _id: new ObjectId(id) });
    if (!blog) {
      return new Response(JSON.stringify({ message: 'Blog not found.' }), { status: 404 });
    }

    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch blog.' }), { status: 500 });
  }
}

export async function PATCH(req: Request, context: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { id } = await context.params;
    const updates = await req.json();

    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: 'Invalid ID.' }), { status: 400 });
    }

    console.log('Updating blog with ID:', id);
    console.log('Update data:', updates);

    const result = await db.collection('blogs').updateOne({ _id: new ObjectId(id) }, { $set: updates });
    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: 'Blog not found.' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Blog updated successfully.' }), { status: 200 });
  } catch (error) {
    console.error('Error updating blog:', error);
    return new Response(JSON.stringify({ message: 'Failed to update blog.' }), { status: 500 });
  }
}


export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { id } = await context.params; // Await the params

    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: 'Invalid ID.' }), { status: 400 });
    }

    const result = await db.collection('blogs').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ message: 'Blog not found.' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Blog deleted successfully.' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return new Response(JSON.stringify({ message: 'Failed to delete blog.' }), { status: 500 });
  }
}

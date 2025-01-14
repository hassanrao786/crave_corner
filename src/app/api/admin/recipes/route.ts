import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Handle GET request (Fetch all Recipes)
export async function GET() {
  const client = await clientPromise;
  const db = client.db('crave_corner');
  const recipes = await db.collection('recipes').find().toArray();

  return new Response(JSON.stringify(recipes), { status: 200 });
}

// Handle POST request (Add a new Recipe)
interface Recipe {
  name: string;
  price: number;
  image: string;
  description: string;
  ingredients: string[];
}

interface Request {
  json: () => Promise<Recipe>;
}

interface Params {
  id: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const newRecipe = await req.json();
    const client = await clientPromise;
    const db = client.db('crave_corner');

    const result = await db.collection('recipes').insertOne(newRecipe);

    return new Response(JSON.stringify({ message: 'Recipe added successfully.', recipeId: result.insertedId }), { status: 201 });
  } catch (error) {
    console.error('Error adding recipe:', error);
    return new Response(JSON.stringify({ message: 'Failed to add recipe.' }), { status: 500 });
  }
}

// Handle DELETE request (Delete a Recipe)
interface DeleteRequest {
  params: Params;
}

export async function DELETE(req: Request, { params }: DeleteRequest): Promise<Response> {
  try {
    const { id } = params; // Extract the ID from the params
    const client = await clientPromise;
    const db = client.db('crave_corner');

    // Ensure the ID is in ObjectId format
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

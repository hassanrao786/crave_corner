import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Handle GET request (Fetch all Recipes)
export async function GET(): Promise<Response> {
  try {
    const client = await clientPromise;
    const db = client.db('crave_corner');
    const recipes = await db.collection('recipes').find().toArray();

    return new Response(JSON.stringify(recipes), { status: 200 });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch recipes.' }), { status: 500 });
  }
}

// Handle POST request (Add a new Recipe)
interface Recipe {
  name: string;
  price: number;
  image: string;
  description: string;
  ingredients: string[];
}

export async function POST(req: Request): Promise<Response> {
  try {
    const newRecipe: Recipe = await req.json();

    // Validate newRecipe
    if (
      !newRecipe.name ||
      !newRecipe.price ||
      !newRecipe.image ||
      !newRecipe.description ||
      !Array.isArray(newRecipe.ingredients)
    ) {
      return new Response(JSON.stringify({ message: 'Invalid recipe data.' }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('crave_corner');
    const result = await db.collection('recipes').insertOne(newRecipe);

    return new Response(
      JSON.stringify({ message: 'Recipe added successfully.', recipeId: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding recipe:', error);
    return new Response(JSON.stringify({ message: 'Failed to add recipe.' }), { status: 500 });
  }
}

// Handle DELETE request (Delete a Recipe)
export async function DELETE(req: Request, { params }: { params: { id: string } }): Promise<Response> {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: 'Invalid ID format.' }), { status: 400 });
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

import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Recipe Type Definition
interface Recipe {
  name: string;
  price: number;
  image: string;
  description: string;
  ingredients: string[];
}

// Main Handler
export async function POST(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const method = req.method;

  switch (method) {
    case 'GET':
      return handleGetAllRecipes();

    case 'POST':
      return handleAddRecipe(req);

    case 'DELETE':
      const id = url.searchParams.get('id'); // Extract ID from query params
      if (!id) {
        return new Response(JSON.stringify({ message: 'ID is required for deletion.' }), { status: 400 });
      }
      return handleDeleteRecipe(id);

    default:
      return new Response(JSON.stringify({ message: 'Method not allowed.' }), { status: 405 });
  }
}

// Handle GET request (Fetch all Recipes)
async function handleGetAllRecipes(): Promise<Response> {
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
async function handleAddRecipe(req: Request): Promise<Response> {
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
async function handleDeleteRecipe(id: string): Promise<Response> {
  try {
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

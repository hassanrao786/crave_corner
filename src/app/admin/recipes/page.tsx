'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Recipe {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  ingredients: string[];
}

export default function ManageRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // State for adding a new recipe
  const [newRecipeName, setNewRecipeName] = useState('');
  const [newRecipePrice, setNewRecipePrice] = useState(0);
  const [newRecipeImage, setNewRecipeImage] = useState(''); // Store image URL
  const [newRecipeDescription, setNewRecipeDescription] = useState('');
  const [newRecipeIngredients, setNewRecipeIngredients] = useState('');
  const [formErrors, setFormErrors] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    ingredients: '',
  });

  // Authentication Check
  useEffect(() => {
    const token = document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1];
    if (!token) {
      router.push('/admin/login'); // Redirect to login if no token is found
      return;
    }

    // Fetch recipes
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [router]);

  const handleDeleteRecipe = async (recipeId: string) => {
    try {
      const token = document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1];
      const response = await fetch(`/api/admin/recipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete recipe');
      }

      // Optimistically update the state after successful deletion
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== recipeId));
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Failed to delete recipe.');
    }
  };

  const handleAddNewRecipe = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation checks
    let isValid = true;
    const errors: any = {};

    if (!newRecipeName) {
      errors.name = 'Name is required';
      isValid = false;
    }
    if (isNaN(newRecipePrice) || newRecipePrice <= 0) {
      errors.price = 'Valid price is required';
      isValid = false;
    }
    if (!newRecipeImage) {
      errors.image = 'Image URL is required';
      isValid = false;
    }
    if (!newRecipeDescription) {
      errors.description = 'Description is required';
      isValid = false;
    }
    if (!newRecipeIngredients) {
      errors.ingredients = 'Ingredients are required';
      isValid = false;
    }

    setFormErrors(errors);

    if (!isValid) return;

    const parsedPrice = parseFloat(newRecipePrice.toString());

    const newRecipe = {
      name: newRecipeName,
      price: parsedPrice,
      image: newRecipeImage,
      description: newRecipeDescription,
      ingredients: newRecipeIngredients.split(',').map((ingredient) => ingredient.trim()),
    };

    try {
      const token = document.cookie.split('; ').find((row) => row.startsWith('token='))?.split('=')[1];
      const response = await fetch('/api/admin/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newRecipe),
      });

      if (!response.ok) {
        throw new Error('Failed to add new recipe');
      }

      const data = await response.json();
      setRecipes([...recipes, data]);

      // Reset form after successful submission
      setNewRecipeName('');
      setNewRecipePrice(0);
      setNewRecipeImage('');
      setNewRecipeDescription('');
      setNewRecipeIngredients('');
      setFormErrors({
        name: '',
        price: '',
        image: '',
        description: '',
        ingredients: '',
      }); // Clear errors
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-bold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 font-bold">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manage Recipes</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add New Recipe</h2>
        <form onSubmit={handleAddNewRecipe} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={newRecipeName}
              onChange={(e) => setNewRecipeName(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price:
            </label>
            <input
              type="number"
              id="price"
              value={newRecipePrice}
              onChange={(e) => setNewRecipePrice(parseFloat(e.target.value))}
              className="mt-1 p-2 border rounded-md w-full"
            />
            {formErrors.price && <p className="text-red-500 text-sm">{formErrors.price}</p>}
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image URL:
            </label>
            <input
              type="text"
              id="image"
              value={newRecipeImage}
              onChange={(e) => setNewRecipeImage(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
            {formErrors.image && <p className="text-red-500 text-sm">{formErrors.image}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description:
            </label>
            <textarea
              id="description"
              value={newRecipeDescription}
              onChange={(e) => setNewRecipeDescription(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
            {formErrors.description && <p className="text-red-500 text-sm">{formErrors.description}</p>}
          </div>

          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
              Ingredients (comma separated):
            </label>
            <input
              type="text"
              id="ingredients"
              value={newRecipeIngredients}
              onChange={(e) => setNewRecipeIngredients(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
            {formErrors.ingredients && <p className="text-red-500 text-sm">{formErrors.ingredients}</p>}
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Recipe
          </button>
        </form>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ingredients
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{recipe.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">${Number(recipe.price).toFixed(2)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{recipe.description}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : 'No ingredients available'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button
                  onClick={() => handleDeleteRecipe(recipe._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

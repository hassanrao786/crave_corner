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

interface FormErrors {
  name: string;
  price: string;
  image: string;
  description: string;
  ingredients: string;
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
  const [formErrors, setFormErrors] = useState<FormErrors>({
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
    const errors: FormErrors = {
      name: '',
      price: '',
      image: '',
      description: '',
      ingredients: '',
    };

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
        <h1 className="text-2xl font-bold mb-6">Manage Recipes</h1>
    
        {/* Form to Add New Recipe */}
        <form onSubmit={handleAddNewRecipe} className="mb-8">
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              value={newRecipeName}
              onChange={(e) => setNewRecipeName(e.target.value)}
              className="border rounded p-2 w-full"
            />
            {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}
          </div>
    
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Price</label>
            <input
              type="number"
              value={newRecipePrice}
              onChange={(e) => setNewRecipePrice(Number(e.target.value))}
              className="border rounded p-2 w-full"
            />
            {formErrors.price && <p className="text-red-500">{formErrors.price}</p>}
          </div>
    
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Image URL</label>
            <input
              type="text"
              value={newRecipeImage}
              onChange={(e) => setNewRecipeImage(e.target.value)}
              className="border rounded p-2 w-full"
            />
            {formErrors.image && <p className="text-red-500">{formErrors.image}</p>}
          </div>
    
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Description</label>
            <textarea
              value={newRecipeDescription}
              onChange={(e) => setNewRecipeDescription(e.target.value)}
              className="border rounded p-2 w-full"
            ></textarea>
            {formErrors.description && <p className="text-red-500">{formErrors.description}</p>}
          </div>
    
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Ingredients (comma-separated)</label>
            <input
              type="text"
              value={newRecipeIngredients}
              onChange={(e) => setNewRecipeIngredients(e.target.value)}
              className="border rounded p-2 w-full"
            />
            {formErrors.ingredients && <p className="text-red-500">{formErrors.ingredients}</p>}
          </div>
    
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Add Recipe
          </button>
        </form>
    
        {/* Recipes List */}
        <div>
          <h2 className="text-xl font-bold mb-4">Existing Recipes</h2>
          {recipes.map((recipe) => (
            <div key={recipe._id} className="mb-4 border-b pb-4">
              <h3 className="font-semibold">{recipe.name}</h3>
              <p>Price: ${recipe.price.toFixed(2)}</p>
              <img src={recipe.image} alt={recipe.name} className="w-32 h-32 object-cover mb-2" />
              <p>{recipe.description}</p>
              <p>Ingredients: {recipe.ingredients.join(', ')}</p>
              <button
                onClick={() => handleDeleteRecipe(recipe._id)}
                className="bg-red-500 text-white py-1 px-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    );
    
  ;
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Params {
  id: string;
}

const RecipeDetails = ({ params }: { params: Params }) => {
  const { id } = params; // Ensure we use `id` from params
  const router = useRouter();

  const recipe = {
    id, // This is the `recipeId`
    name: 'Spaghetti Bolognese',
    description: 'A classic Italian pasta dish with rich tomato meat sauce.',
    ingredients: ['Pasta', 'Tomato Sauce', 'Ground Beef', 'Onions', 'Garlic'],
  };

  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOrder = async () => {
    if (!customerName.trim() || !customerAddress.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    const payload = {
      recipeId: recipe.id, // Ensure recipeId is included
      recipeName: recipe.name,
      customerName,
      customerAddress,
    };

    console.log('Payload sent to API:', payload);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to place the order.');
      }

      const data = await response.json();
      console.log('Response from API:', data);
      router.push('/delivery-status');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{recipe.name}</h1>
      <p className="mb-4">{recipe.description}</p>
      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Your Name"
          className="border p-2 rounded w-full"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Your Address"
          className="border p-2 rounded w-full"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
        />
      </div>
      <button
        className="bg-yellow-500 text-white py-2 px-4 rounded"
        onClick={handleOrder}
        disabled={loading}
      >
        {loading ? 'Placing Order...' : 'Order with COD'}
      </button>
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default RecipeDetails;

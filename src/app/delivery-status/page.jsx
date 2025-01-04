'use client';

import { useState, useEffect } from 'react';

const DeliveryStatusPage = () => {
  const [status, setStatus] = useState('pending');
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    // Simulate fetching delivery status from the database
    const timer = setTimeout(() => {
      setStatus('delivered');
      setRecipeDetails({
        name: 'Spaghetti Bolognese',
        description: 'A classic Italian pasta dish with rich tomato meat sauce.',
        ingredients: ['Pasta', 'Tomato Sauce', 'Ground Beef', 'Onions', 'Garlic'],
      });
    }, 3000); // Simulate delivery delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Delivery Status</h1>
      {status === 'pending' ? (
        <p className="text-yellow-600">Your order is on the way...</p>
      ) : (
        <div>
          <p className="text-green-600 mb-4">Your order has been delivered!</p>
          {recipeDetails && (
            <div>
              <h2 className="text-xl font-semibold mb-2">{recipeDetails.name}</h2>
              <p>{recipeDetails.description}</p>
              <h3 className="text-lg font-semibold mt-4">Ingredients</h3>
              <ul className="list-disc list-inside">
                {recipeDetails.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeliveryStatusPage;

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";


async function placeOrder(orderDetails) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be signed in to place an order.");
      return; // Exit the function if not signed in
    }
    

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Pass the token
      },
      body: JSON.stringify(orderDetails),
    });

    if (!response.ok) {
      throw new Error(`Failed to place order: ${response.statusText}`);
    }

    const data = await response.json();

    alert(`Order placed successfully! Our rider is on the way .............Order ID: ${data.orderId}`);
  } catch (error) {
    console.error("Error placing order:", error);
    alert("Failed to place order.");
  }
}

export default function RecipePage({ params: paramsPromise }) {
  const router = useRouter();
  const params = use(paramsPromise); // Unwrap the params Promise
  const { id } = params; // Access the unwrapped params object
  const [recipe, setRecipe] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch(`/api/recipes/${id}`);
        const data = await res.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    }
    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please sign in to place an order.");
      router.push("/login"); // Redirect to login page
      return;
    }

    const orderDetails = {
      recipeId: recipe._id,
      ...formData,
      price: recipe.price,
    };
    placeOrder(orderDetails);
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{recipe.name}</h1>
      <img
        src={recipe.image}
        alt={recipe.name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="text-gray-700 mb-4">{recipe.description}</p>
      <p className="text-gray-900 font-semibold mb-2">
        Ingredients: {recipe.ingredients.join(", ")}
      </p>
      <p className="text-yellow-600 font-bold mb-4">Price: ${recipe.price}</p>

      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={() => setIsFormVisible(true)}
      >
        Order with Cash on Delivery
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Place Order
          </button>
        </form>
      )}
    </div>
  );
}

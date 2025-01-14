import Link from 'next/link';

async function fetchRecipes() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes`);
    if (!res.ok) {
      throw new Error(`Failed to fetch recipes: ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
}

export default async function Recipes() {
  const recipes = await fetchRecipes();

  return (
    <div className="p-8 bg-gradient-to-b from-blue-100 via-white to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-black min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
        Explore Our Delicious Recipes
      </h1>
      {recipes.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-400">No recipes found or an error occurred.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <Link key={recipe._id} href={`/recipes/${recipe._id}`} className="group relative border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent text-white p-4 flex flex-col justify-end">
                <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
                <p className="text-lg font-medium">Price: ${recipe.price}</p>
              </div>
              <div className="absolute inset-0 bg-transparent group-hover:bg-black/30 transition-all duration-300 ease-in-out"></div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

import { MongoClient } from 'mongodb';

const uri = process.env.DATABASE_URL || "mongodb+srv://hassanrao875:11223344@cravecorner.vaj7u.mongodb.net/?retryWrites=true&w=majority&appName=CraveCorner";
const client = new MongoClient(uri);

async function seedRecipes() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('crave_corner');
    const recipesCollection = db.collection('recipes');

    const sampleRecipes = [
      {
        name: 'Spaghetti Carbonara',
        price: 12.99,
        image: '/images/spaghetti-carbonara.jpg',
        description: 'A classic Italian pasta dish.',
        ingredients: ['Pasta', 'Eggs', 'Cheese', 'Bacon'],
      },
      {
        name: 'Chicken Tikka',
        price: 9.99,
        image: '/images/chicken-tikka.jpg',
        description: 'A spicy and flavorful Indian dish.',
        ingredients: ['Chicken', 'Yogurt', 'Spices', 'Lemon Juice'],
      },
      {
        name: 'Margherita Pizza',
        price: 15.99,
        image: '/images/margherita-pizza.jpg',
        description: 'A classic pizza with tomatoes, mozzarella, and basil.',
        ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Basil'],
      },
    ];

    const result = await recipesCollection.insertMany(sampleRecipes);
    console.log(`${result.insertedCount} recipes inserted!`);
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
  }
}

seedRecipes();

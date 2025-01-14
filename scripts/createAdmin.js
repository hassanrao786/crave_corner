import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

const createAdmin = async () => {
  const uri = 'mongodb+srv://hassanrao875:11223344@cravecorner.vaj7u.mongodb.net/?retryWrites=true&w=majority&appName=CraveCorner'; // Replace with your MongoDB connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('cravecorner'); // Use the existing database name
    // Replace with your database name
    const hashedPassword = await bcrypt.hash('rao345', 10);

    const result = await db.collection('admins').insertOne({
      email: 'hassanrao874@gmail.com',
      password: hashedPassword,
    });

    console.log('Admin user created:', result.insertedId);
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await client.close();
  }
};

createAdmin();

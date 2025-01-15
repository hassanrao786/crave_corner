import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use the default database from your connection URI or specify one
    const blogs = await db.collection('blogs').find({}).toArray();

    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch blogs.' }), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content, author, picture } = await req.json();

    // Validate input fields
    if (!title || !content || !author) {
      return new Response(JSON.stringify({ message: 'Invalid input.' }), { status: 400 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Insert the blog into the 'blogs' collection
    const result = await db.collection('blogs').insertOne({
      title,
      content,
      author,
      picture,
      createdAt: new Date(),
    });

    // Respond with success and the newly created blog ID
    return new Response(
      JSON.stringify({ message: 'Blog created successfully.', blogId: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog:', error);
    return new Response(JSON.stringify({ message: 'Failed to create blog.' }), { status: 500 });
  }
}


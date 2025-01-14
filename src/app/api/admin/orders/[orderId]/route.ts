import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PATCH(req: Request, { params }: { params: { orderId: string } }) {
  try {
    const { orderId } = params;
    const { status } = await req.json();

    if (!ObjectId.isValid(orderId)) {
      return new Response(JSON.stringify({ message: 'Invalid orderId format.' }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('cravecorner');

    const result = await db.collection('orders').updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status } }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: 'Order not found.' }), { status: 404 });
    }

    if (status === 'Completed') {
      // Logic to send the book to the user
      const order = await db.collection('orders').findOne({ _id: new ObjectId(orderId) });
      const userEmail = order?.email; // Assuming you have the user's email in the order document

      // Send the book to the user
      await sendBookToEmail(userEmail);

      // Notify the user that the book has been sent
      return new Response(JSON.stringify({ message: 'Order status updated successfully. The book has been sent to your email.' }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: 'Order status updated successfully.' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to update order status.' }), { status: 500 });
  }
}

async function sendBookToEmail(email: string) {
  // Implement your logic to send the book to the user's email
  console.log(`Sending book to ${email}`);
  // This could be an email service integration
}

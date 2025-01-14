// /api/admin/orders
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Handle GET request (Fetch all Orders)
interface Order {
    _id: string;
    status: string;
    // Add other order fields as needed
}

export async function GET(req: Request): Promise<Response> {
    try {
        const client = await clientPromise;
        const db = client.db('cravecorner');
        const orders: Order[] = (await db.collection('orders').find({}).toArray()).map(order => ({
            _id: order._id.toString(),
            status: order.status,
            // Map other order fields as needed
        }));

        return new Response(JSON.stringify(orders), { status: 200 });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return new Response(JSON.stringify({ message: 'Failed to fetch orders.' }), { status: 500 });
    }
}

// Handle PATCH request (Update Order Status)
// export async function PATCH(req: { json: () => PromiseLike<{ orderId: any; status: any; }> | { orderId: any; status: any; }; }) {
//   try {
//     const { orderId, status } = await req.json();
//     const client = await clientPromise;
//     const db = client.db('cravecorner');

//     const result = await db.collection('orders').updateOne(
//       { _id: new ObjectId(orderId) },
//       { $set: { status } }
//     );

//     if (result.modifiedCount === 0) {
//       throw new Error('Failed to update order status');
//     }

//     return new Response(JSON.stringify({ message: 'Order status updated successfully.' }), { status: 200 });
//   } catch (error) {
//     console.error('Error updating order status:', error);
//     return new Response(JSON.stringify({ message: 'Failed to update order status.' }), { status: 500 });
//   }
// }




export async function PATCH(req: Request) {
    try {
      console.log('PATCH request received');
      const { orderId, status } = await req.json();
      console.log('Received Payload:', { orderId, status });
  
      if (!ObjectId.isValid(orderId)) {
        console.error('Invalid orderId format:', orderId);
        return new Response(JSON.stringify({ message: 'Invalid orderId format.' }), { status: 400 });
      }
  
      const client = await clientPromise;
      const db = client.db('cravecorner');
  
      const result = await db.collection('orders').updateOne(
        { _id: new ObjectId(orderId) },
        { $set: { status } }
      );
      console.log('Update Result:', result);
  
      if (result.matchedCount === 0) {
        console.error('Order not found:', orderId);
        return new Response(JSON.stringify({ message: 'Order not found.' }), { status: 404 });
      }
  
      if (result.modifiedCount === 0) {
        return new Response(
          JSON.stringify({ message: 'Order status is already set to the requested value.' }),
          { status: 200 }
        );
      }
  
      return new Response(JSON.stringify({ message: 'Order status updated successfully.' }), { status: 200 });
    } catch (error) {
      console.error('Error updating order status:', error);
      return new Response(JSON.stringify({ message: 'Failed to update order .' }), { status: 500 });
    }
  }
  
  




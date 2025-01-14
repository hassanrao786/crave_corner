async function fetchOrders() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
  }
  
  export default async function DeliveryStatus() {
    const orders = await fetchOrders();
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Delivery Status</h1>
        {orders.map((order) => (
          <div key={order._id} className="border p-4 my-2 rounded shadow">
            <h2 className="text-xl font-semibold">{order.recipe.name}</h2>
            <p>Status: {order.status}</p>
            {order.status === 'Delivered' && (
              <div>
                <h3 className="font-bold mt-2">Recipe Details:</h3>
                <p>{order.recipe.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
  
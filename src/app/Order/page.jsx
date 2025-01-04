const OrderPage = () => {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Place Your Order</h1>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" className="w-full border p-2 rounded" placeholder="Your Name" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <textarea className="w-full border p-2 rounded" placeholder="Your Address"></textarea>
          </div>
          <button type="submit" className="bg-yellow-500 text-white py-2 px-4 rounded">Place Order</button>
        </form>
      </div>
    );
  };
  
  export default OrderPage;
  
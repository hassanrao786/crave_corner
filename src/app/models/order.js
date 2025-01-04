import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    recipeId: { type: String, required: true },
    recipeName: { type: String, required: true },
    customerName: { type: String, required: true },
    customerAddress: { type: String, required: true },
    status: { type: String, default: 'pending' }, // 'pending' or 'delivered'
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);

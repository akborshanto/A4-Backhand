import mongoose, { Schema } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to user
    products: [
      {
        bicycleId: { type: Schema.Types.ObjectId, ref: 'Bicycle', required: true }, // Reference to Bicycle
        quantity: { type: Number, required: true }, // Quantity of the bicycle
      },
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true, enum: ['pending', 'completed', 'shipped', 'cancelled'] },
    createdAt: { type: Date, default: Date.now },
  });
  
  const OrderModel = mongoose.model<IOrder>('Order', orderSchema);
  
  export default OrderModel;
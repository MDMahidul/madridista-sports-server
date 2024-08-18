import { model, Schema, Types } from 'mongoose';
import { TCartItem, TCustomerOrderInfo } from './order.interface';

// Cart Item Schema
const OrderSchema = new Schema<TCartItem>({
  productId: { type: String, required: [true, 'Product id is required!'] },
  quantity: { type: Number, required: [true, 'Product quantity is required!'] },
});

// Customer Order Schema
const CustomerOrderSchema = new Schema<TCustomerOrderInfo>(
  {
    customer: {
      type: Types.ObjectId,
      ref: 'User', 
      required: [true, 'Customer is required!'],
    },
    cartItems: { type: [OrderSchema], required: true },
  },
  {
    timestamps: true,
  },
);

export const Order = model<TCustomerOrderInfo>('Order', CustomerOrderSchema);

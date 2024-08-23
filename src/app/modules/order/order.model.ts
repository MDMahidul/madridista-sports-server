import { Schema, model } from 'mongoose';
import { TCustomerOrderInfo } from './order.interface';

// Order Schema
const orderSchema = new Schema<TCustomerOrderInfo>(
  {
    user: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true },
);

const Order = model<TCustomerOrderInfo>('Order', orderSchema);

export default Order;

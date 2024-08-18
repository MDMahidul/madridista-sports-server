import { Schema, model } from 'mongoose';
import { TCartItem, TCart } from './cart.interface';

const CartItemSchema = new Schema<TCartItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const CartSchema = new Schema<TCart>(
  {
    user: {
      type: String,
      required: true,
    },
    items: [CartItemSchema],
  },
  {
    timestamps: true,
  },
);

export const Cart = model<TCart>('Cart', CartSchema);

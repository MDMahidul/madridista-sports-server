import { model, Schema } from "mongoose";
import { TCartItem, TCustomerOrderInfo } from "./order.interface";

const CartItemSchema= new Schema<TCartItem>({
  _id: { type: String, required: [true, 'Product id is required!'] },
  name: { type: String, required: [true, 'Product name is required!'] },
  imageLink: { type: String, required: [true, 'Product image link is required!']},
  price: { type: Number, required: [true, 'Product price is required!'] },
  quantity: { type: Number, required: [true, 'Product quantity is required!'] },
});

const CustomerOrderSchema = new Schema<TCustomerOrderInfo>(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required!'],
    },
    email: { type: String, required: [true, 'Customer email is required!'] },
    phone: {
      type: String,
      required: [true, 'Customer phone number is required!'],
    },
    address: {
      type: String,
      required: [true, 'Customer address is required!'],
    },
    cartItems: { type: [CartItemSchema], required: true },
  },
  {
    timestamps: true,
  },
);



export const Order = model<TCustomerOrderInfo>('Order', CustomerOrderSchema);

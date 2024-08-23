/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../Product/product.model';
import Order from './order.model';
import { Cart } from '../Cart/cart.model';
import { JwtPayload } from 'jsonwebtoken';

const createOrderIntoDB = async (
  orderData: { phoneNumber: string; address: string; paymentMethod: string },
  userData: JwtPayload,
) => {
  const { email } = userData;
  const { phoneNumber, address, paymentMethod } = orderData;

  // Fetch the user's cart with populated product details
  const cart = await Cart.findOne({ user: email }).populate('items.product');

  // Check if the cart exists and has items
  if (!cart || cart.items.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Cart is empty!');
  }

  let totalPrice = 0;

  // Calculate total price and reduce product quantities
  for (const item of cart.items) {
    const product = await Product.findById(item.product);
    if (!product) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Product with id ${item.product} not found!`,
      );
    }

    if (product.quantity < item.quantity) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Insufficient stock for product ${product.name}!`,
      );
    }
    // Calculate total price
    totalPrice += item.quantity * product.price;
  }

  // Create the order and save it to the database
  try {
    const order = new Order({
      user: email,
      items: cart.items,
      address,
      phoneNumber,
      totalPrice,
      paymentMethod,
    });

    const result = await order.save();

    // Reduce product quantity
      for (const item of cart.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { quantity: -item.quantity },
        });
      }
    /* delete cart item after place the order */
    await Cart.findOneAndDelete({ user: email });

    return result;
  } catch (error:any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.messgae || 'Something went wrong!');
  }
};

const getUserOrderFromDB = async (userData: JwtPayload) => {
  const { email } = userData;

  // Fetch the user's cart with populated product details
  const order = await Order.find({ user: email }).populate('items.product');

  // Check if the cart exists and has items
  if (!order || order?.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No order data found for this user!');
  }

  return order;
};


export const OrderService = { createOrderIntoDB, getUserOrderFromDB };

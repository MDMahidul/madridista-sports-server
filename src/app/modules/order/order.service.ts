import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../Product/product.model';
import { TCustomerOrderInfo } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (payload: TCustomerOrderInfo) => {
  const { customer, cartItems } = payload;

  try {
    // first check quantity
    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      if (!product || product.quantity < item.quantity) {
        throw new AppError(
          httpStatus.BAD_GATEWAY,
          `Not enough stock right now !`,
        );
      }
    }

    // deduct the item quantity
    for (const item of cartItems) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { quantity: -item.quantity },
      });
    }

    const order = new Order({ customer, cartItems });
    const result = await order.save();
    return result;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong!');
  }
};

export const OrderService = { createOrderIntoDB };

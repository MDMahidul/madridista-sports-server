import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from '../Product/product.model';
import { TCustomerOrderInfo } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (payload: TCustomerOrderInfo) => {
  const { customerName, email, phone, address, cartItems } = payload;

  try {
    // first check quantity
    for (const item of cartItems) {
      const product = await Product.findById(item._id);
      if (!product || product.quantity < item.quantity) {
        throw new AppError(
          httpStatus.BAD_GATEWAY,
          `Not enough stock for ${item.name}`,
        );
      }
    }

    // deduct the item quantity
    for (const item of cartItems) {
      await Product.findByIdAndUpdate(item._id, {
        $inc: { quantity: -item.quantity },
      });
    }

    const order = new Order({ customerName, email, phone, address, cartItems });
    const result = await order.save();
    return result;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong!');
  }
};

export const OrderService = { createOrderIntoDB };

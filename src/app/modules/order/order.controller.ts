import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderService.createOrderIntoDB(req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order placed successfully!',
    data: result,
  });
});
const getUserOrder = catchAsync(async (req, res) => {
  const result = await OrderService.getUserOrderFromDB(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order data retrive successfully!',
    data: result,
  });
});

export const OrderController = { createOrder, getUserOrder };

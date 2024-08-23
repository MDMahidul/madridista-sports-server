import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { CartServices } from './cart.service';
 
const addItemToCart = catchAsync(async (req, res) => {
  const result = await CartServices.addToCartIntoDB(
    req.body.items,
    req.user,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product added to cart successfully!',
    data: result,
  });
});

const updateItemToCart = catchAsync(async (req, res) => {

  const { productId, quantity } = req.body;
  const result = await CartServices.updateCartIntoDB(
    productId,
    quantity,
    req.user,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated to cart successfully!',
    data: result,
  });
});

const removeCartItem = catchAsync(async (req, res) => {
  const { productId } = req.body;
  const result = await CartServices.removeCartFromDB(productId, req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Remove Product from cart successfully !',
    data: result,
  });
});

const clearCartItem = catchAsync(async (req, res) => {
  const result = await CartServices.clearCartFromDB(req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Clear cart successfully !',
    data: result,
  });
});

const getCart = catchAsync(async (req, res) => {
  const result = await CartServices.getCartFromDB(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cart items retrive successfully!',
    data: result,
  });
});

export const CartController = {
  addItemToCart,
  getCart,
  updateItemToCart,
  clearCartItem,
  removeCartItem,
};

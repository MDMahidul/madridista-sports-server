import { JwtPayload } from 'jsonwebtoken';
import { TCartItem } from './cart.interface';
import { Cart } from './cart.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Product } from '../Product/product.model';

const addToCartIntoDB = async (item: TCartItem, userData: JwtPayload) => {
  const { email } = userData;
  /* find if user exist one cart db */
  let cart = await Cart.findOne({ user: email });

  /*   get the product to check available stock */
  const product = await Product.findById(item.product);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found !');
  }

  if (item.quantity > product.quantity) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Not enough product available !`,
    );
  }

  /*  If no then, create a new one */
  if (!cart) {
    cart = new Cart({
      user: email,
      items: [item],
    });
  } else {
    /*  Check if the product is already in the cart */
    const existingItem = cart.items.find(
      (cartItem) => cartItem.product.toString() === item.product.toString(),
    );
    // If product exists, update the quantity
    if (existingItem) {
      const newQuantity = (existingItem.quantity += item.quantity);
      if (newQuantity > product.quantity) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Not enough product available !`,
        );
      }
      existingItem.quantity = newQuantity;
    } else {
      // If product doesn't exist, add it to the cart
      // If product doesn't exist in the cart, ensure the quantity does not exceed stock
      if (item.quantity > product.quantity) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Not enough product available !`,
        );
      }
      cart.items.push(item);
    }
  }

  return await cart.save();
};

const updateCartIntoDB = async (
  productId: string,
  quantity: number,
  userData: JwtPayload,
) => {
  const { email } = userData;
  /* find if user exist one cart db */
  const cart = await Cart.findOne({ user: email });
  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, 'No cart data found!');
  }

  /* find the product to update */
  const cartItem = cart.items.find(
    (cartItem) => cartItem.product.toString() === productId,
  );

  if (!cartItem) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item not found in cart!');
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  // check if the new quantity would exceed the available stock
  if (cartItem.quantity + quantity > product.quantity) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Not enough product available !`,
    );
  }

  cartItem.quantity += quantity;

  if (cartItem.quantity <= 0) {
    cart.items = cart.items.filter(
      (cartItem) => cartItem.product.toString() !== productId,
    );
  }

  return await cart.save();
};

const removeCartFromDB = async (productId: string, userData: JwtPayload) => {
  const { email } = userData;
  /* find if user exist one cart db */
  const cart = await Cart.findOne({ user: email });
  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, 'No cart data found!');
  }

  /* find the product to remove */
  const cartIndex = cart.items.findIndex(
    (cartItem) => cartItem.product.toString() === productId,
  );
  if (cartIndex === -1) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item not found in cart!');
  }
  /* removethe item */
  cart.items.splice(cartIndex, 1);

  return await cart.save();
};

const clearCartFromDB = async (userData: JwtPayload) => {
  const { email } = userData;
  /* find if user exist one cart db */
  const cart = await Cart.findOne({ user: email });
  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, 'No cart data found!');
  }

  cart.items = [];

  return await cart.save();
};

const getCartFromDB = async (userData: JwtPayload) => {
  const { email } = userData;
  const result = await Cart.findOne({ user: email }).populate('items.product');
  return result;
};

export const CartServices = {
  addToCartIntoDB,
  getCartFromDB,
  removeCartFromDB,
  clearCartFromDB,
  updateCartIntoDB,
};

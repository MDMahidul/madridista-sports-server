import { JwtPayload } from 'jsonwebtoken';
import { TWishItem } from './wishlist.interface';
import { Wishlist } from './wishlist.model';
import { Product } from '../Product/product.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const addToWishlistIntoDB = async (item: TWishItem, userData: JwtPayload) => {
  const { email } = userData;
  
  /* find if user exist one cart db */
  let wishlist = await Wishlist.findOne({ user: email });

  /*   get the product to check available stock */
  const product = await Product.findById(item.product);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found !');
  }

  if (!wishlist) {
    wishlist = new Wishlist({
      user: email,
      items: [item],
    });
  } else {
    // Check if the item is already in the wishlist
    const existingItem = wishlist.items.find(
      (wishlistItem) =>
        wishlistItem.product.toString() === item.product.toString(),
    );

    if (!existingItem) {
      // If the item is not in the wishlist, add it
      wishlist.items.push(item);
    }
  }

  await wishlist.save();

  return wishlist;
};

const removeWishItemFromDB = async (productId: string, userData: JwtPayload) => {
  const { email } = userData;
  /* find if user exist one cart db */
  const wishlist = await Wishlist.findOne({ user: email });
  if (!wishlist) {
    throw new AppError(httpStatus.NOT_FOUND, 'No cart data found!');
  }

  /* find the product to remove */
  const wishlistIndex = wishlist.items.findIndex(
    (cartItem) => cartItem.product.toString() === productId,
  );
  if (wishlistIndex === -1) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item not found in cart!');
  }
  /* removethe item */
  wishlist.items.splice(wishlistIndex, 1);

  return await wishlist.save();
};

const clearWishlistFromDB = async (userData: JwtPayload) => {
  const { email } = userData;
  /* find if user exist one cart db */
  const wishlist = await Wishlist.findOne({ user: email });
  if (!wishlist) {
    throw new AppError(httpStatus.NOT_FOUND, 'No wishlist data found!');
  }

  await wishlist.deleteOne();

  return ;
};

const getWishlistFromDB = async (userData: JwtPayload) => {
  const { email } = userData;
  const result = await Wishlist.findOne({ user: email }).populate('items.product');
  return result;
};

export const WishlistService = {
  addToWishlistIntoDB,
  removeWishItemFromDB,
  clearWishlistFromDB,
  getWishlistFromDB,
};

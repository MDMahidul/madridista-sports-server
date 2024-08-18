import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { WishlistService } from './wishlist.service';

const addItemToWishlist = catchAsync(async (req, res) => {
  const result = await WishlistService.addToWishlistIntoDB(
    req.body.items[0],
    req.user,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item added to wishlist successfully!',
    data: result,
  });
});

const removeItemFromWishlist = catchAsync(async (req, res) => {
  const { productId } = req.body;
  const result = await WishlistService.removeWishItemFromDB(
    productId,
    req.user,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Item removed from wishlist successfully!',
    data: result,
  });
});

const clearWishliatItem = catchAsync(async (req, res) => {
  const result = await WishlistService.clearWishlistFromDB(req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Clear wishlist successfully !',
    data: result,
  });
});

const getWishlist = catchAsync(async (req, res) => {
  const result = await WishlistService.getWishlistFromDB(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist items retrive successfully!',
    data: result,
  });
});

export const WishlistController = {
  addItemToWishlist,
  removeItemFromWishlist,
  clearWishliatItem,
  getWishlist,
};

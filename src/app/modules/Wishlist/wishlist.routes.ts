import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { WishlistValidation } from './wishlist.validation';
import { WishlistController } from './wishlist.controller';

const router = express.Router();

router.post(
  '/add-to-wishlist',
  auth(USER_ROLE.user),
  validateRequest(WishlistValidation.createWishlistValidationSchema),
  WishlistController.addItemToWishlist,
);

router.put(
  '/remove-wishlist',
  auth(USER_ROLE.user),
  WishlistController.removeItemFromWishlist,
);

router.put('/remove-wishlist', auth(USER_ROLE.user), WishlistController.removeItemFromWishlist);

router.put(
  '/clear-wishlist',
  auth(USER_ROLE.user),
  WishlistController.clearWishliatItem,
);

router.get('/get-wishlist', auth(USER_ROLE.user), WishlistController.getWishlist);

export const WishlistRouters =router;
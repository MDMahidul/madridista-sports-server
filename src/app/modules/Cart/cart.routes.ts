import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CartValidation } from './cart.validation';
import { CartController } from './cart.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/add-to-cart',
  auth(USER_ROLE.user),
  validateRequest(CartValidation.createCartValidationSchema),
  CartController.addItemToCart,
);

router.patch(
  '/update-cart',
  auth(USER_ROLE.user),
  CartController.updateItemToCart,
);

router.put(
  '/remove-cart',
  auth(USER_ROLE.user),
  CartController.removeCartItem,
);

router.put(
  '/clear-cart',
  auth(USER_ROLE.user),
  CartController.clearCartItem,
);

router.get('/get-cart', auth(USER_ROLE.user), CartController.getCart);

export const CartRouters = router;

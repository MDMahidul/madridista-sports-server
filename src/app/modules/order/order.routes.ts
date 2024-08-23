import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from './order.validation';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/add-order',
  auth(USER_ROLE.user),
  validateRequest(OrderValidation.createOrderValidationSchema),
  OrderController.createOrder,
);

router.get(
  '/get-user-order',
  auth(USER_ROLE.user),
  OrderController.getUserOrder,
);

export const OrderRouters = router;

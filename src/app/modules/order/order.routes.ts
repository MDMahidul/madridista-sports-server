import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from './order.validation';
import { OrderController } from './order.controller';

const router = express.Router();

router.post(
  '/add-order',
  validateRequest(OrderValidation.createOrderValidationSchema),
  OrderController.createOrder,
);

export const OrderRouters=router;

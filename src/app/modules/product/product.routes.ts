import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { productValidations } from './product.validation';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/add-product',validateRequest(productValidations.createProductValidationSchema),ProductControllers.createProduct);

export const ProductRouters = router;
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { productValidations } from './product.validation';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/add-product',validateRequest(productValidations.createProductValidationSchema),ProductControllers.createProduct);

router.get('/all-products',ProductControllers.getAllProducts);

router.get('/get-product/:id',ProductControllers.getSingleProduct);

router.put('/update-product/:id',validateRequest(productValidations.updateProductValidationSchema),ProductControllers.updateSingleProduct);

router.delete('/delete-product/:id',ProductControllers.deleteSingleProduct);

export const ProductRouters = router;
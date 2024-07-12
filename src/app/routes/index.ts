import { Router } from 'express';
import { ProductRouters } from '../modules/product/product.routes';

const router = Router();

const modelRoutes = [
  {
    path: '/',
    route: ProductRouters,
  },
];

modelRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

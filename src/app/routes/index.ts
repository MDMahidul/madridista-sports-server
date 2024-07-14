import { Router } from 'express';
import { ProductRouters } from '../modules/product/product.routes';
import { OrderRouters } from '../modules/order/order.routes';

const router = Router();

const modelRoutes = [
  {
    path: '/',
    route: ProductRouters,
  },
  {
    path: '/order',
    route: OrderRouters,
  },
];

modelRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

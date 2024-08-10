import { Router } from 'express';
import { ProductRouters } from '../modules/Product/product.routes';
import { OrderRouters } from '../modules/Order/order.routes';
import { UserRoutes } from '../modules/User/user.routes';

const router = Router();

const modelRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/product',
    route: ProductRouters,
  },
  {
    path: '/order',
    route: OrderRouters,
  },
];

modelRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

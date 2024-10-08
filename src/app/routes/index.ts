import { Router } from 'express';
import { ProductRouters } from '../modules/Product/product.routes';
import { OrderRouters } from '../modules/Order/order.routes';
import { UserRoutes } from '../modules/User/user.routes';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { CartRouters } from '../modules/Cart/cart.routes';
import { WishlistRouters } from '../modules/Wishlist/wishlist.routes';
import { BlogRouters } from '../modules/Blog/blog.routes';

const router = Router();

const modelRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
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
  {
    path: '/cart',
    route: CartRouters,
  },
  {
    path: '/wishlist',
    route: WishlistRouters,
  },
  {
    path: '/blog',
    route: BlogRouters,
  },
];

modelRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

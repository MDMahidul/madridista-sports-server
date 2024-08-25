"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_routes_1 = require("../modules/Product/product.routes");
const order_routes_1 = require("../modules/Order/order.routes");
const user_routes_1 = require("../modules/User/user.routes");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const cart_routes_1 = require("../modules/Cart/cart.routes");
const wishlist_routes_1 = require("../modules/Wishlist/wishlist.routes");
const blog_routes_1 = require("../modules/Blog/blog.routes");
const router = (0, express_1.Router)();
const modelRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/product',
        route: product_routes_1.ProductRouters,
    },
    {
        path: '/order',
        route: order_routes_1.OrderRouters,
    },
    {
        path: '/cart',
        route: cart_routes_1.CartRouters,
    },
    {
        path: '/wishlist',
        route: wishlist_routes_1.WishlistRouters,
    },
    {
        path: '/blog',
        route: blog_routes_1.BlogRouters,
    },
];
modelRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

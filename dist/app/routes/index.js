"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_routes_1 = require("../modules/product/product.routes");
const order_routes_1 = require("../modules/order/order.routes");
const router = (0, express_1.Router)();
const modelRoutes = [
    {
        path: '/product',
        route: product_routes_1.ProductRouters,
    },
    {
        path: '/order',
        route: order_routes_1.OrderRouters,
    },
];
modelRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

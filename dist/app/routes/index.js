"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_routes_1 = require("../modules/product/product.routes");
const router = (0, express_1.Router)();
const modelRoutes = [
    {
        path: '/',
        route: product_routes_1.ProductRouters,
    },
];
modelRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

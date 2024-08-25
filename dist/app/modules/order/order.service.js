"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = require("../Product/product.model");
const order_model_1 = __importDefault(require("./order.model"));
const cart_model_1 = require("../Cart/cart.model");
const createOrderIntoDB = (orderData, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    const { phoneNumber, address, paymentMethod } = orderData;
    // Fetch the user's cart with populated product details
    const cart = yield cart_model_1.Cart.findOne({ user: email }).populate('items.product');
    // Check if the cart exists and has items
    if (!cart || cart.items.length === 0) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Cart is empty!');
    }
    let totalPrice = 0;
    // Calculate total price and reduce product quantities
    for (const item of cart.items) {
        const product = yield product_model_1.Product.findById(item.product);
        if (!product) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, `Product with id ${item.product} not found!`);
        }
        if (product.quantity < item.quantity) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Insufficient stock for product ${product.name}!`);
        }
        // Calculate total price
        totalPrice += item.quantity * product.price;
    }
    // Create the order and save it to the database
    try {
        const order = new order_model_1.default({
            user: email,
            items: cart.items,
            address,
            phoneNumber,
            totalPrice,
            paymentMethod,
        });
        const result = yield order.save();
        // Reduce product quantity
        for (const item of cart.items) {
            yield product_model_1.Product.findByIdAndUpdate(item.product, {
                $inc: { quantity: -item.quantity },
            });
        }
        /* delete cart item after place the order */
        yield cart_model_1.Cart.findOneAndDelete({ user: email });
        return result;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, error.messgae || 'Something went wrong!');
    }
});
const getUserOrderFromDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    // Fetch the user's cart with populated product details
    const order = yield order_model_1.default.find({ user: email }).populate('items.product');
    // Check if the cart exists and has items
    if (!order || (order === null || order === void 0 ? void 0 : order.length) === 0) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'No order data found for this user!');
    }
    return order;
});
exports.OrderService = { createOrderIntoDB, getUserOrderFromDB };

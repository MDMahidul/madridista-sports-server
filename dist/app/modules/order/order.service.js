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
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const createOrderIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerName, email, phone, address, cartItems } = payload;
    try {
        // first check quantity
        for (const item of cartItems) {
            const product = yield product_model_1.Product.findById(item._id);
            if (!product || product.quantity < item.quantity) {
                throw new AppError_1.default(http_status_1.default.BAD_GATEWAY, `Not enough stock for ${item.name}`);
            }
        }
        // deduct the item quantity
        for (const item of cartItems) {
            yield product_model_1.Product.findByIdAndUpdate(item._id, {
                $inc: { quantity: -item.quantity },
            });
        }
        const order = new order_model_1.Order({ customerName, email, phone, address, cartItems });
        const result = yield order.save();
        return result;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Something went wrong!');
    }
});
exports.OrderService = { createOrderIntoDB };

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
exports.CartServices = void 0;
const cart_model_1 = require("./cart.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const product_model_1 = require("../Product/product.model");
const addToCartIntoDB = (items, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    /* find if user exist one cart db */
    let cart = yield cart_model_1.Cart.findOne({ user: email });
    if (!cart) {
        cart = new cart_model_1.Cart({
            user: email,
            items: [],
        });
    }
    for (const item of items) {
        /*   get the product to check available stock */
        const product = yield product_model_1.Product.findById(item.product);
        if (!product) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found !');
        }
        if (item.quantity > product.quantity) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Not enough product available !`);
        }
        /*  Check if the product is already in the cart */
        const existingItem = cart.items.find((cartItem) => cartItem.product.toString() === item.product.toString());
        // If product exists, update the quantity
        if (existingItem) {
            const newQuantity = (existingItem.quantity += item.quantity);
            if (newQuantity > product.quantity) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Not enough product available !`);
            }
            existingItem.quantity = newQuantity;
        }
        else {
            // If product doesn't exist, add it to the cart
            // If product doesn't exist in the cart, ensure the quantity does not exceed stock
            if (item.quantity > product.quantity) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Not enough product available !`);
            }
            cart.items.push(item);
        }
    }
    return yield cart.save();
});
const updateCartIntoDB = (productId, quantity, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    /* find if user exist one cart db */
    const cart = yield cart_model_1.Cart.findOne({ user: email });
    if (!cart) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No cart data found!');
    }
    /* find the product to update */
    const cartItem = cart.items.find((cartItem) => cartItem.product.toString() === productId);
    if (!cartItem) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Item not found in cart!');
    }
    const product = yield product_model_1.Product.findById(productId);
    if (!product) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
    }
    // check if the new quantity would exceed the available stock
    if (cartItem.quantity + quantity > product.quantity) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Not enough product available !`);
    }
    cartItem.quantity += quantity;
    if (cartItem.quantity <= 0) {
        cart.items = cart.items.filter((cartItem) => cartItem.product.toString() !== productId);
    }
    return yield cart.save();
});
const removeCartFromDB = (productId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    /* find if user exist one cart db */
    const cart = yield cart_model_1.Cart.findOne({ user: email });
    if (!cart) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No cart data found!');
    }
    /* find the product to remove */
    const cartIndex = cart.items.findIndex((cartItem) => cartItem.product.toString() === productId);
    if (cartIndex === -1) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Item not found in cart!');
    }
    /* removethe item */
    cart.items.splice(cartIndex, 1);
    return yield cart.save();
});
const clearCartFromDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    /* find if user exist one cart db */
    const cart = yield cart_model_1.Cart.findOne({ user: email });
    if (!cart) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No cart data found!');
    }
    yield cart.deleteOne();
    return;
});
const getCartFromDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    const result = yield cart_model_1.Cart.findOne({ user: email }).populate('items.product');
    return result;
});
exports.CartServices = {
    addToCartIntoDB,
    getCartFromDB,
    removeCartFromDB,
    clearCartFromDB,
    updateCartIntoDB,
};

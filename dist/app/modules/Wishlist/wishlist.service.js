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
exports.WishlistService = void 0;
const wishlist_model_1 = require("./wishlist.model");
const product_model_1 = require("../Product/product.model");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const addToWishlistIntoDB = (item, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    /* find if user exist one cart db */
    let wishlist = yield wishlist_model_1.Wishlist.findOne({ user: email });
    /*   get the product to check available stock */
    const product = yield product_model_1.Product.findById(item.product);
    if (!product) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found !');
    }
    if (!wishlist) {
        wishlist = new wishlist_model_1.Wishlist({
            user: email,
            items: [item],
        });
    }
    else {
        // Check if the item is already in the wishlist
        const existingItem = wishlist.items.find((wishlistItem) => wishlistItem.product.toString() === item.product.toString());
        if (!existingItem) {
            // If the item is not in the wishlist, add it
            wishlist.items.push(item);
        }
    }
    yield wishlist.save();
    return wishlist;
});
const removeWishItemFromDB = (productId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    /* find if user exist one cart db */
    const wishlist = yield wishlist_model_1.Wishlist.findOne({ user: email });
    if (!wishlist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No cart data found!');
    }
    /* find the product to remove */
    const wishlistIndex = wishlist.items.findIndex((cartItem) => cartItem.product.toString() === productId);
    if (wishlistIndex === -1) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Item not found in cart!');
    }
    /* removethe item */
    wishlist.items.splice(wishlistIndex, 1);
    return yield wishlist.save();
});
const clearWishlistFromDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    /* find if user exist one cart db */
    const wishlist = yield wishlist_model_1.Wishlist.findOne({ user: email });
    if (!wishlist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No wishlist data found!');
    }
    yield wishlist.deleteOne();
    return;
});
const getWishlistFromDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    const result = yield wishlist_model_1.Wishlist.findOne({ user: email }).populate('items.product');
    return result;
});
exports.WishlistService = {
    addToWishlistIntoDB,
    removeWishItemFromDB,
    clearWishlistFromDB,
    getWishlistFromDB,
};

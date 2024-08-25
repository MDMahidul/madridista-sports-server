"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wishlist = void 0;
const mongoose_1 = require("mongoose");
const WishItemSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
});
const WishlistSchema = new mongoose_1.Schema({
    user: {
        type: String,
        required: true,
    },
    items: [WishItemSchema],
}, {
    timestamps: true,
});
exports.Wishlist = (0, mongoose_1.model)('Wishlist', WishlistSchema);

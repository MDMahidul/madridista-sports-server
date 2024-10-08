"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const CartItemSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
});
const CartSchema = new mongoose_1.Schema({
    user: {
        type: String,
        required: true,
    },
    items: [CartItemSchema],
}, {
    timestamps: true,
});
exports.Cart = (0, mongoose_1.model)('Cart', CartSchema);

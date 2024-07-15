"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const CartItemSchema = new mongoose_1.Schema({
    _id: { type: String, required: [true, 'Product id is required!'] },
    name: { type: String, required: [true, 'Product name is required!'] },
    imageLink: { type: String, required: [true, 'Product image link is required!'] },
    price: { type: Number, required: [true, 'Product price is required!'] },
    quantity: { type: Number, required: [true, 'Product quantity is required!'] },
});
const CustomerOrderSchema = new mongoose_1.Schema({
    customerName: {
        type: String,
        required: [true, 'Customer name is required!'],
    },
    email: { type: String, required: [true, 'Customer email is required!'] },
    phone: {
        type: String,
        required: [true, 'Customer phone number is required!'],
    },
    address: {
        type: String,
        required: [true, 'Customer address is required!'],
    },
    cartItems: { type: [CartItemSchema], required: true },
}, {
    timestamps: true,
});
exports.Order = (0, mongoose_1.model)('Order', CustomerOrderSchema);

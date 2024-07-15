"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const CartItemSchema = zod_1.z.object({
    _id: zod_1.z.string().nonempty({ message: 'Product id is required!' }),
    name: zod_1.z.string().nonempty({ message: 'Product name is required!' }),
    imageLink: zod_1.z
        .string()
        .nonempty({ message: 'Product image link is required!' }),
    price: zod_1.z
        .number()
        .min(0, { message: 'Product price must be a positive number!' }),
    quantity: zod_1.z
        .number()
        .min(1, { message: 'Product quantity must be at least 1!' }),
});
const createOrderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        customerName: zod_1.z
            .string()
            .nonempty({ message: 'Customer name is required!' }),
        email: zod_1.z
            .string()
            .email({ message: 'Invalid email address!' })
            .nonempty({ message: 'Customer email is required!' }),
        phone: zod_1.z
            .string()
            .nonempty({ message: 'Customer phone number is required!' }),
        address: zod_1.z.string().nonempty({ message: 'Customer address is required!' }),
        cartItems: zod_1.z
            .array(CartItemSchema)
            .nonempty({ message: 'Cart items are required!' }),
    }),
});
exports.OrderValidation = { createOrderValidationSchema };

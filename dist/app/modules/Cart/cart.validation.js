"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartValidation = void 0;
const zod_1 = require("zod");
const createCartValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        items: zod_1.z
            .array(zod_1.z.object({
            product: zod_1.z.string().nonempty({ message: 'Product ID is required!' }),
            quantity: zod_1.z
                .number()
                .min(1, { message: 'Quantity must be at least 1!' }),
        }))
            .nonempty({ message: 'Cart items are required!' }),
    }),
});
exports.CartValidation = { createCartValidationSchema };

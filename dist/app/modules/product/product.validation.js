"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidations = void 0;
const zod_1 = require("zod");
const createProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().nonempty('Product name is required!'),
        brand: zod_1.z.string().nonempty('Product brand is required!'),
        category: zod_1.z.string().nonempty('Product category is required!'),
        price: zod_1.z.number().nonnegative('Price must be a positive number'),
        ratings: zod_1.z
            .number()
            .min(0, 'Ratings cannot be less than 0')
            .max(5, 'Ratings cannot be more than 5'),
        quantity: zod_1.z.number().nonnegative('Quantity must be a positive number'),
        off: zod_1.z.number().nonnegative('Off must be a positive number'),
        description: zod_1.z.string().nonempty('Product description is required!'),
        imageLink: zod_1.z.string().nonempty('Product image link is required!'),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
exports.productValidations = { createProductValidationSchema };

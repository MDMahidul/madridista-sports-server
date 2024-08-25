"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistValidation = void 0;
const zod_1 = require("zod");
const createWishlistValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        items: zod_1.z
            .array(zod_1.z.object({
            product: zod_1.z.string().nonempty({ message: 'Product ID is required!' })
        }))
            .nonempty({ message: 'Items are required!' }),
    }),
});
exports.WishlistValidation = { createWishlistValidationSchema };

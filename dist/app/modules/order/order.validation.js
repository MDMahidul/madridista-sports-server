"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const createOrderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z
            .string()
            .nonempty({ message: 'Customer phone number is required!' }),
        address: zod_1.z.string().nonempty({ message: 'Customer address is required!' }),
        paymentMethod: zod_1.z
            .string()
            .nonempty({ message: 'paymentMethod address is required!' }),
    }),
});
exports.OrderValidation = { createOrderValidationSchema };

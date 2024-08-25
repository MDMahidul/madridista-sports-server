"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.object({
            name: zod_1.z.string({ required_error: 'Name is required!' }).trim(),
            email: zod_1.z
                .string({ required_error: 'Email is required!' })
                .email({ message: 'Invalid email address' }),
            password: zod_1.z.string({ required_error: 'Password is required!' }),
            contactNo: zod_1.z.string({ required_error: 'Phone number is required!' }),
            address: zod_1.z.string({ required_error: 'Address is required!' }),
            role: zod_1.z.string().default('user'),
        }),
    }),
});
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.object({
            name: zod_1.z.string().trim().optional(),
            email: zod_1.z.string().email({ message: 'Invalid email address' }).optional(),
            contactNo: zod_1.z.string().optional(),
            address: zod_1.z.string().optional(),
        }),
    }),
});
const changeStatusValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([...user_constant_1.userStatus]),
    }),
});
exports.userValidations = {
    createUserValidationSchema,
    updateUserValidationSchema,
    changeStatusValidationSchema,
};

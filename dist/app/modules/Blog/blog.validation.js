"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidationSchema = void 0;
const zod_1 = require("zod");
const createBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        blogTitle: zod_1.z.string().nonempty('Blog title is required'),
        category: zod_1.z.enum([
            'Diet',
            'Lifestyle',
            'Sports',
            'Fitness',
            'Exercis',
            'Tools',
            'Health-Care',
        ], {
            errorMap: () => ({
                message: 'Must select a category',
            }),
        }),
        authorName: zod_1.z.string().nonempty('Author name is required'),
        imageLink: zod_1.z
            .string()
            .url('Invalid URL format')
            .nonempty('Image link is required'),
        description: zod_1.z.string().nonempty('Description is required'),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
const updateBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        blogTitle: zod_1.z.string().optional(),
        category: zod_1.z
            .enum([
            'Diet',
            'Lifestyle',
            'Sports',
            'Fitness',
            'Exercise',
            'Tools',
            'Health-Care',
        ])
            .optional(),
        authorName: zod_1.z.string().nonempty('Author name is required'),
        imageLink: zod_1.z.string().url('Invalid URL format').optional(),
        description: zod_1.z.string().optional(),
    }),
});
exports.blogValidationSchema = {
    createBlogValidationSchema,
    updateBlogValidationSchema,
};

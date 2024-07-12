import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Product name is required!'),
    brand: z.string().nonempty('Product brand is required!'),
    category: z.string().nonempty('Product category is required!'),
    price: z.number().nonnegative('Price must be a positive number'),
    ratings: z
      .number()
      .min(0, 'Ratings cannot be less than 0')
      .max(5, 'Ratings cannot be more than 5'),
    quantity: z.number().nonnegative('Quantity must be a positive number'),
    off: z.number().nonnegative('Off must be a positive number').optional(),
    description: z.string().nonempty('Product description is required!'),
    imageLink: z.string().nonempty('Product image link is required!'),
    isDeleted: z.boolean().default(false),
  }),
});
const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Product name is required!').optional(),
    brand: z.string().nonempty('Product brand is required!').optional(),
    category: z.string().nonempty('Product category is required!').optional(),
    price: z.number().nonnegative('Price must be a positive number').optional(),
    ratings: z
        .number()
        .min(0, 'Ratings cannot be less than 0')
        .max(5, 'Ratings cannot be more than 5')
        .optional(),
    quantity: z.number().nonnegative('Quantity must be a positive number').optional(),
    off: z.number().nonnegative('Off must be a positive number').optional(),
    description: z.string().nonempty('Product description is required!').optional(),
    imageLink: z.string().nonempty('Product image link is required!').optional(),
    isDeleted: z.boolean().default(false),
  }),
});

export const productValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
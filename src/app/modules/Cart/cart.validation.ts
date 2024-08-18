import { z } from 'zod';

const createCartValidationSchema = z.object({
  body: z.object({
    items: z
      .array(
        z.object({
          product: z.string().nonempty({ message: 'Product ID is required!' }),
          quantity: z
            .number()
            .min(1, { message: 'Quantity must be at least 1!' }),
        }),
      )
      .nonempty({ message: 'Cart items are required!' }),
  }),
});

export const CartValidation = { createCartValidationSchema };

import { z } from 'zod';

const createWishlistValidationSchema = z.object({
  body: z.object({
    items: z
      .array(
        z.object({
          product: z.string().nonempty({ message: 'Product ID is required!' })
        }),
      )
      .nonempty({ message: 'Items are required!' }),
  }),
});

export const WishlistValidation = { createWishlistValidationSchema };

import { z } from 'zod';

const CartItemSchema = z.object({
  _id: z.string().nonempty({ message: 'Product id is required!' }),
  name: z.string().nonempty({ message: 'Product name is required!' }),
  imageLink: z
    .string()
    .nonempty({ message: 'Product image link is required!' }),
  price: z
    .number()
    .min(0, { message: 'Product price must be a positive number!' }),
  quantity: z
    .number()
    .min(1, { message: 'Product quantity must be at least 1!' }),
});

const createOrderValidationSchema = z.object({
  body: z.object({
    customerName: z
      .string()
      .nonempty({ message: 'Customer name is required!' }),
    email: z
      .string()
      .email({ message: 'Invalid email address!' })
      .nonempty({ message: 'Customer email is required!' }),
    phone: z
      .string()
      .nonempty({ message: 'Customer phone number is required!' }),
    address: z.string().nonempty({ message: 'Customer address is required!' }),
    cartItems: z
      .array(CartItemSchema)
      .nonempty({ message: 'Cart items are required!' }),
  }),
});

export const OrderValidation = { createOrderValidationSchema };

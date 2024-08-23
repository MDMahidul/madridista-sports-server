import { z } from 'zod';

const createOrderValidationSchema = z.object({
  body: z.object({
    phoneNumber: z
      .string()
      .nonempty({ message: 'Customer phone number is required!' }),
    address: z.string().nonempty({ message: 'Customer address is required!' }),
    paymentMethod: z
      .string()
      .nonempty({ message: 'paymentMethod address is required!' }),
  }),
});

export const OrderValidation = { createOrderValidationSchema };

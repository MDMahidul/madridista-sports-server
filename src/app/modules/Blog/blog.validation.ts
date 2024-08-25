import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    blogTitle: z.string().nonempty('Blog title is required'),
    category: z.enum(
      [
        'Diet',
        'Lifestyle',
        'Sports',
        'Fitness',
        'Exercis',
        'Tools',
        'Health-Care',
      ],
      {
        errorMap: () => ({
          message: 'Must select a category',
        }),
      },
    ),
    authorName: z.string().nonempty('Author name is required'),
    imageLink: z
      .string()
      .url('Invalid URL format')
      .nonempty('Image link is required'),
    description: z.string().nonempty('Description is required'),
    isDeleted: z.boolean().default(false),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    blogTitle: z.string().optional(),
    category: z
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
    authorName: z.string().nonempty('Author name is required'),
    imageLink: z.string().url('Invalid URL format').optional(),
    description: z.string().optional(),
  }),
});

export const blogValidationSchema = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};

import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { blogValidationSchema } from './blog.validation';
import { BlogControllers } from './blog.controller';

const router = express.Router();

router.post(
  '/add-blog',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(blogValidationSchema.createBlogValidationSchema),
  BlogControllers.createBlog,
);

router.get('/all-blogs', BlogControllers.getAllBlogs);

router.get('/get-blog/:id', BlogControllers.getSingleBlog);

router.put(
  '/update-blog/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(blogValidationSchema.updateBlogValidationSchema),
  BlogControllers.updateSingleBlog,
);

router.delete(
  '/delete-blog/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  BlogControllers.deleteSingleBlog,
);

export const BlogRouters = router;

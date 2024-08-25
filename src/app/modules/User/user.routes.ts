import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/user-signup',
  validateRequest(userValidations.createUserValidationSchema),
  UserControllers.createUser,
);

router.post(
  '/create-admin',
  validateRequest(userValidations.createUserValidationSchema),
  UserControllers.createAdmin,
);

router.get(
  '/profile',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user),
  UserControllers.getUserProfile,
);

router.get('/user', UserControllers.getOnlyUsers);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  UserControllers.getSingleUser,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  UserControllers.getAllUsers,
);

router.put(
  '/update-user-profile',auth(USER_ROLE.admin, USER_ROLE.superAdmin,USER_ROLE.user),
  validateRequest(userValidations.updateUserValidationSchema),
  UserControllers.updateUser,
);

router.delete('/:id', UserControllers.deleteSingleUser);

export const UserRoutes = router;

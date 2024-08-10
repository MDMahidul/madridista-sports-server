import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(userValidations.createUserValidationSchema),
  UserControllers.createUser,
);
router.post(
  '/create-admin',
  validateRequest(userValidations.createUserValidationSchema),
  UserControllers.createAdmin,
);
router.get('/user', UserControllers.getOnlyUsers); // Place this before the route with the dynamic parameter
router.get('/:id', UserControllers.getSingleUser);
router.get('/', UserControllers.getAllUsers);
router.put(
  '/:id',
  validateRequest(userValidations.updateUserValidationSchema),
  UserControllers.updateUser,
);
router.delete('/:id', UserControllers.deleteSingleUser);


export const UserRoutes = router;

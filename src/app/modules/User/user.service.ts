import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateAdminId, generateUserId } from './user.utils';
import QueryBuilder from '../../builder/QueryBuilder';
import { userSearchableFields } from './user.constant';

const createUserIntoDB = async (payload: TUser) => {
  const userData: Partial<TUser> = { ...payload };
  // set generated id
  userData.id = await generateUserId();
  userData.role = "user"
  userData.membership = 'general';
  const result = await User.create(userData);

  return result;
};

const createAdminIntoDB = async (payload: TUser) => {
  const userData: Partial<TUser> = { ...payload };
  // set generated id
  userData.id = await generateAdminId();
  userData.role='admin';
  const result = await User.create(userData);

  return result;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return { result, meta };
};

const getOnlyUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find({ role: 'user' }), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return { result, meta };
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Student ID!');
  }

  return result;
};

const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSingleUserFromDB = async (id: string) => {
  const isUserExist = await User.findById(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }
  const deleteUser = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!deleteUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user!');
  }
  return deleteUser;
};

const getMe = async (userId: string) => {
  const result = await User.findOne({ id: userId }).populate('user');

  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

export const UserServices = {
  createUserIntoDB,
  createAdminIntoDB,
  getAllUsersFromDB,
  getOnlyUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteSingleUserFromDB,
  getMe,
  changeStatus,
};

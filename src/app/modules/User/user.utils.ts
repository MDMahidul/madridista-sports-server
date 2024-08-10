import { User } from './user.model';

const findLastUserId = async () => {
  const lastUser = await User.findOne({ role: 'user' }, { id: 1, _id: -1 })
    .sort({ createdAt: -1 })
    .lean();

  /* if there are any user then return the substring of the id starting from the 2nd character */
  return lastUser?.id ? lastUser.id.substring(2) : undefined;
};

export const generateUserId = async () => {
  let currentId = (0).toString();
  const lastUserId = await findLastUserId();

  if (lastUserId) {
    currentId = lastUserId;
  }
  /* Increment the currentId by 1 and pad it with leading zeros to ensure it is 5 digits long. */
  let incrementId = (Number(currentId) + 1).toString().padStart(5, '0');

  incrementId = `U-${incrementId}`;

  return incrementId;
};

const findLastAdminId = async () => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(5, '0');

  incrementId = `A-${incrementId}`;

  return incrementId;
};

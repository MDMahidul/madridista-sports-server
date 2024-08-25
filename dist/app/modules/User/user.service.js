"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const user_constant_1 = require("./user.constant");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = Object.assign({}, payload);
    // set generated id
    userData.id = yield (0, user_utils_1.generateUserId)();
    userData.role = 'user';
    userData.membership = 'general';
    const result = yield user_model_1.User.create(userData);
    return result;
});
const createAdminIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = Object.assign({}, payload);
    // set generated id
    userData.id = yield (0, user_utils_1.generateAdminId)();
    userData.role = 'admin';
    const result = yield user_model_1.User.create(userData);
    return result;
});
const getAllUsersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(user_model_1.User.find(), query)
        .search(user_constant_1.userSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield userQuery.countTotal();
    const result = yield userQuery.modelQuery;
    return { result, meta };
});
const getOnlyUsersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(user_model_1.User.find({ role: 'user' }), query)
        .search(user_constant_1.userSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield userQuery.countTotal();
    const result = yield userQuery.modelQuery;
    return { result, meta };
});
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Invalid Student ID!');
    }
    return result;
});
/* const updateUserIntoDB = async (
  payload: Partial<TUser>,
  userInfo: JwtPayload,
) => {
  const { email } = userInfo;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const result = await User.findOneAndUpdate( {email:email},payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Something went wrong !');
  }

  return result;
}; */
const updateUserIntoDB = (payload, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userInfo;
    const user = yield user_model_1.User.findOne({ email: email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    const result = yield user_model_1.User.findOneAndUpdate({ email: email }, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findById(id);
    if (!isUserExist) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    const deleteUser = yield user_model_1.User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!deleteUser) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to delete user!');
    }
    return deleteUser;
});
const getUserProfileFromDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    const result = yield user_model_1.User.findOne({ email: email });
    return result;
});
const changeStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
exports.UserServices = {
    createUserIntoDB,
    createAdminIntoDB,
    getAllUsersFromDB,
    getOnlyUsersFromDB,
    getSingleUserFromDB,
    updateUserIntoDB,
    deleteSingleUserFromDB,
    getUserProfileFromDB,
    changeStatus,
};

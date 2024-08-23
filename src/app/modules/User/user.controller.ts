import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import { RequestHandler } from "express";

const createUser = catchAsync(async(req,res)=>{
    const {user:userData}=req.body;

    const result = await UserServices.createUserIntoDB(userData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User is created successfully',
      data: result,
    });
})

const createAdmin = catchAsync(async(req,res)=>{
    const {user:userData}=req.body;

    const result = await UserServices.createAdminIntoDB(userData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Admin is created successfully',
      data: result,
    });
})

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users data retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const getOnlyUsers: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.getOnlyUsersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users data retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUserFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User data retrieved successfully!',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { user: userData } = req.body;
  const result = await UserServices.updateUserIntoDB(id, userData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully !',
    data: result,
  });
});

const deleteSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteSingleUserFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User deleted  successfully!',
    data: result,
  });
});

const getUserProfile = catchAsync(async (req, res) => {
  const result = await UserServices.getUserProfileFromDB(req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile retrieved successfully!',
    data: result,
  });
});


export const UserControllers = {
  createUser,
  createAdmin,
  getSingleUser,
  getAllUsers,
  getOnlyUsers,
  updateUser,getUserProfile,
  deleteSingleUser,
};
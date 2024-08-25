import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlogIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog added successfully!',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog data retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const updateSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.updateSingleBlogIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully!',
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.getSingleBlogFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog data retrived successfully!',
    data: result,
  });
});
const deleteSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogServices.deleteSingleBlogIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully!',
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  updateSingleBlog,
  getSingleBlog,
  deleteSingleBlog,
};

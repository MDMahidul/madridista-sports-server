import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { BlogSearchableFields } from './blog.constant';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
  const existingBlog = await Blog.findOne({
    blogTitle: payload.blogTitle,
  });
  if (existingBlog) {
    throw new Error('Blog with the same name already exists');
  }
  const result = await Blog.create(payload);
  return result;
};

const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find({ isDeleted: false }), query)
    .search(BlogSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await blogQuery.countTotal();
  const result = await blogQuery.modelQuery;

  return { result, meta };
};

const updateSingleBlogIntoDB = async (id: string, payload: Partial<TBlog>) => {
  const isBlogExists = await Blog.isBlogExists(id);

  if (!isBlogExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Blog Found');
  }
  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const getSingleBlogFromDB = async (id: string) => {
  const isBlogExists = await Blog.isBlogExists(id);

  if (!isBlogExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  const result = await Blog.findById(id);
  return result;
};

const deleteSingleBlogIntoDB = async (id: string) => {
  const isBlogExists = await Blog.isBlogExists(id);

  if (!isBlogExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Blog Found');
  }
  const result = await Blog.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogFromDB,
  updateSingleBlogIntoDB,
  deleteSingleBlogIntoDB,
  getSingleBlogFromDB,
};

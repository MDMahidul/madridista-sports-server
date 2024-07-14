import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { ProductSearchableFields } from './product.constant';

const createProductIntoDB = async (payload: TProduct) => {
  const existingProduct = await Product.findOne({ name: payload.name });
  if (existingProduct) {
    throw new Error('Product with the same name already exists');
  }
  const result = await Product.create(payload);
  return result;
};

/* const getAllProductFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(ProductSearchableFields)
    .filter()
    .sort();

  const result = await productQuery.modelQuery;
  return result;
}; */

const getAllProductFromDB = async (query) => {
  const { category, name } = query;
  const searchCriteria = {};

  if (category) {
    searchCriteria.category = new RegExp(category, 'i');
  }
  if (name) {
    searchCriteria.name = new RegExp(name, 'i');
  }

  const result = await Product.find(searchCriteria).sort({ createdAt: -1 });
  return result;
};

const updateSingleProductIntoDB = async (
  id: string,
  payload: Partial<TProduct>,
) => {
  const isProductExists = await Product.isProductExists(id);

  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  const result = await Product.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const isProductExists = await Product.isProductExists(id);

  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  const result = await Product.findById(id);
  return result;
};
const deleteSingleProductIntoDB = async (id: string) => {
  const isProductExists = await Product.isProductExists(id);

  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const ProductService = {
  createProductIntoDB,
  getAllProductFromDB,
  updateSingleProductIntoDB,
  deleteSingleProductIntoDB,
  getSingleProductFromDB,
};

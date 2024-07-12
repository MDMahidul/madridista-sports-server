import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  const existingProduct = await Product.findOne({ name: payload.name });
  if (existingProduct) {
    throw new Error('Product with the same name already exists');
  }
  const result = await Product.create(payload);
  return result;
};

const getAllProductFromDB = async () => {
  const result = await Product.find().sort({ createdAt: -1 });
  return result;
};

const updateSingleProductIntoDB = async (id:string,payload:Partial<TProduct>) => {
  const isProductExists = await Product.isProductExists(id);

  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  const result = await Product.findByIdAndUpdate(id,payload,{new:true});
  return result;
};

const deleteSingleProductIntoDB = async (id:string) => {
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
};

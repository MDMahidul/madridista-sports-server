import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductService } from './product.service';

type TProductQuery= {
  category?: string;
  name?: string;
}

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductService.createProductIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product added successfully!',
    data: result,
  });
});



const getAllProducts = catchAsync(async (req, res) => {
  const { category, name } = req.query as unknown as TProductQuery;
  const result = await ProductService.getAllProductFromDB({ category, name });

  if (result.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message:
        category || name
          ? `No products found matching the criteria`
          : 'No products found in the database!',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products data retrieved successfully!',
    data: result,
  });
});

const updateSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.updateSingleProductIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully!',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.getSingleProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product data retrived successfully!',
    data: result,
  });
});
const deleteSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.deleteSingleProductIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully!',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  updateSingleProduct,
  deleteSingleProduct,
  getSingleProduct,
};

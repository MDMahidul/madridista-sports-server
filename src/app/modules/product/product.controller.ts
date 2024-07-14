import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductService } from './product.service';

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductService.createProductIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product added successfully!',
    data: result,
  });
});

/* const getAllProducts = catchAsync(async (req, res) => {
  try {
    //const { searchTerm } = req.query;
    const result = await ProductService.getAllProductFromDB(
      req.query,
    );

    if (result.length === 0) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'No products found in the database!',
        data: null,
      });
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Products data retrieved successfully!',
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'An error occurred while retrieving products data!',
      data: null,
    });
  }
}); */

const getAllProducts = catchAsync(async (req, res) => {
  const { category, name } = req.query;
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

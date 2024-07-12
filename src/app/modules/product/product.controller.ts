import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductService } from "./product.service";


const createProduct = catchAsync(async(req,res)=>{
    const result = await ProductService.createProductIntoDB(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product added successfully!',
      data: result,
    });
});

const getAllProducts = catchAsync(async(req,res)=>{
    const result = await ProductService.getAllProductFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Products data retrived successfully!',
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
};
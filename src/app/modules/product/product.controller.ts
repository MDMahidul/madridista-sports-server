import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductService } from "./product.service";


const createProduct = catchAsync(async(req,res)=>{
    const result = await ProductService.createProductIntoDB(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product added successfully',
      data: result,
    });
})

export const ProductControllers={
    createProduct
}
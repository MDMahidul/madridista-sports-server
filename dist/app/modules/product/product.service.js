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
exports.ProductService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = require("./product.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const product_constant_1 = require("./product.constant");
/* type TQuery ={
  category?: string;
  name?: string;
} */
const createProductIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingProduct = yield product_model_1.Product.findOne({ name: payload.name });
    if (existingProduct) {
        throw new Error('Product with the same name already exists');
    }
    const result = yield product_model_1.Product.create(payload);
    return result;
});
/* const getAllProductFromDB = async (query: TQuery): Promise<TProduct[]> => {
  const { category, name } = query;
  const searchCriteria: { [key: string]: any } = {};

  if (category) {
    searchCriteria.category = new RegExp(category, 'i');
  }
  if (name) {
    searchCriteria.name = new RegExp(name, 'i');
  }

  const result = await Product.find(searchCriteria).sort({ createdAt: -1 });
  return result;
}; */
const getAllProductFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(product_model_1.Product.find({ isDeleted: false }), query)
        .search(product_constant_1.ProductSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield productQuery.countTotal();
    const result = yield productQuery.modelQuery;
    return { result, meta };
});
const updateSingleProductIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExists = yield product_model_1.Product.isProductExists(id);
    if (!isProductExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No Data Found');
    }
    const result = yield product_model_1.Product.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExists = yield product_model_1.Product.isProductExists(id);
    if (!isProductExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No Data Found');
    }
    const result = yield product_model_1.Product.findById(id);
    return result;
});
const deleteSingleProductIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExists = yield product_model_1.Product.isProductExists(id);
    if (!isProductExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No Data Found');
    }
    const result = yield product_model_1.Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
exports.ProductService = {
    createProductIntoDB,
    getAllProductFromDB,
    updateSingleProductIntoDB,
    deleteSingleProductIntoDB,
    getSingleProductFromDB,
};

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
exports.BlogServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_constant_1 = require("./blog.constant");
const blog_model_1 = require("./blog.model");
const createBlogIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingBlog = yield blog_model_1.Blog.findOne({
        blogTitle: payload.blogTitle,
    });
    if (existingBlog) {
        throw new Error('Blog with the same name already exists');
    }
    const result = yield blog_model_1.Blog.create(payload);
    return result;
});
const getAllBlogFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.default(blog_model_1.Blog.find({ isDeleted: false }), query)
        .search(blog_constant_1.BlogSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield blogQuery.countTotal();
    const result = yield blogQuery.modelQuery;
    return { result, meta };
});
const updateSingleBlogIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExists = yield blog_model_1.Blog.isBlogExists(id);
    if (!isBlogExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No Blog Found');
    }
    const result = yield blog_model_1.Blog.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const getSingleBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExists = yield blog_model_1.Blog.isBlogExists(id);
    if (!isBlogExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No Data Found');
    }
    const result = yield blog_model_1.Blog.findById(id);
    return result;
});
const deleteSingleBlogIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExists = yield blog_model_1.Blog.isBlogExists(id);
    if (!isBlogExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No Blog Found');
    }
    const result = yield blog_model_1.Blog.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
exports.BlogServices = {
    createBlogIntoDB,
    getAllBlogFromDB,
    updateSingleBlogIntoDB,
    deleteSingleBlogIntoDB,
    getSingleBlogFromDB,
};

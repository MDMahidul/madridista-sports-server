"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRouters = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const router = express_1.default.Router();
router.post('/add-blog', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(blog_validation_1.blogValidationSchema.createBlogValidationSchema), blog_controller_1.BlogControllers.createBlog);
router.get('/all-blogs', blog_controller_1.BlogControllers.getAllBlogs);
router.get('/get-blog/:id', blog_controller_1.BlogControllers.getSingleBlog);
router.put('/update-blog/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(blog_validation_1.blogValidationSchema.updateBlogValidationSchema), blog_controller_1.BlogControllers.updateSingleBlog);
router.delete('/delete-blog/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin, user_constant_1.USER_ROLE.admin), blog_controller_1.BlogControllers.deleteSingleBlog);
exports.BlogRouters = router;

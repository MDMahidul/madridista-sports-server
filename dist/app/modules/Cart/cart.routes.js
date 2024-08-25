"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRouters = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cart_validation_1 = require("./cart.validation");
const cart_controller_1 = require("./cart.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
router.post('/add-to-cart', (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(cart_validation_1.CartValidation.createCartValidationSchema), cart_controller_1.CartController.addItemToCart);
router.patch('/update-cart', (0, auth_1.default)(user_constant_1.USER_ROLE.user), cart_controller_1.CartController.updateItemToCart);
router.put('/remove-cart', (0, auth_1.default)(user_constant_1.USER_ROLE.user), cart_controller_1.CartController.removeCartItem);
router.put('/clear-cart', (0, auth_1.default)(user_constant_1.USER_ROLE.user), cart_controller_1.CartController.clearCartItem);
router.get('/get-cart', (0, auth_1.default)(user_constant_1.USER_ROLE.user), cart_controller_1.CartController.getCart);
exports.CartRouters = router;

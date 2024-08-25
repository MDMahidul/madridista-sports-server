"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouters = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_validation_1 = require("./order.validation");
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
router.post('/add-order', (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(order_validation_1.OrderValidation.createOrderValidationSchema), order_controller_1.OrderController.createOrder);
router.get('/get-user-order', (0, auth_1.default)(user_constant_1.USER_ROLE.user), order_controller_1.OrderController.getUserOrder);
exports.OrderRouters = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouters = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_validation_1 = require("./product.validation");
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post('/add-product', (0, validateRequest_1.default)(product_validation_1.productValidations.createProductValidationSchema), product_controller_1.ProductControllers.createProduct);
router.get('/all-products', product_controller_1.ProductControllers.getAllProducts);
router.get('/get-product/:id', product_controller_1.ProductControllers.getSingleProduct);
router.put('/update-product/:id', (0, validateRequest_1.default)(product_validation_1.productValidations.updateProductValidationSchema), product_controller_1.ProductControllers.updateSingleProduct);
router.delete('/delete-product/:id', product_controller_1.ProductControllers.deleteSingleProduct);
exports.ProductRouters = router;

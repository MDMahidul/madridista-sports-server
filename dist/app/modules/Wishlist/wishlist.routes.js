"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistRouters = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const wishlist_validation_1 = require("./wishlist.validation");
const wishlist_controller_1 = require("./wishlist.controller");
const router = express_1.default.Router();
router.post('/add-to-wishlist', (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(wishlist_validation_1.WishlistValidation.createWishlistValidationSchema), wishlist_controller_1.WishlistController.addItemToWishlist);
router.put('/remove-wishlist', (0, auth_1.default)(user_constant_1.USER_ROLE.user), wishlist_controller_1.WishlistController.removeItemFromWishlist);
router.put('/remove-wishlist', (0, auth_1.default)(user_constant_1.USER_ROLE.user), wishlist_controller_1.WishlistController.removeItemFromWishlist);
router.put('/clear-wishlist', (0, auth_1.default)(user_constant_1.USER_ROLE.user), wishlist_controller_1.WishlistController.clearWishliatItem);
router.get('/get-wishlist', (0, auth_1.default)(user_constant_1.USER_ROLE.user), wishlist_controller_1.WishlistController.getWishlist);
exports.WishlistRouters = router;

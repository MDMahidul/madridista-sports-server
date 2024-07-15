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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required!'],
        unique: true
    },
    brand: {
        type: String,
        required: [true, 'Product brand is required!'],
    },
    category: {
        type: String,
        required: [true, 'Product category is required!'],
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be a positive number'],
    },
    ratings: {
        type: Number,
        required: true,
        min: [0, 'Ratings cannot be less than 0'],
        max: [5, 'Ratings cannot be more than 5'],
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Quantity must be a positive number'],
    },
    off: {
        type: Number,
        required: false,
        min: [0, 'Off must be a positive number'],
    },
    description: {
        type: String,
        required: [true, 'Product description is required!'],
    },
    imageLink: {
        type: String,
        required: [true, 'Product image link is required!'],
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});
// create query middleware
productSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
productSchema.statics.isProductExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.Product.findById(id);
    });
};
exports.Product = (0, mongoose_1.model)('Product', productSchema);

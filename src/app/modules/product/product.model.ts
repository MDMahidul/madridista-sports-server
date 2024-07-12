import { model, Schema } from "mongoose";
import { ProductModel, TProduct } from "./product.interface";

const productSchema = new Schema<TProduct, ProductModel>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required!'],
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
      required: true,
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
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  },
);

productSchema.statics.isProductExists=async function(name:string):Promise<boolean>{
  const count = await this.countDocuments({ name });
    return count > 0;
}

export const Product = model<TProduct,ProductModel>('Product',productSchema);
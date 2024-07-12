import { Model } from 'mongoose';

export type TProduct = {
  name: string;
  brand: string;
  category: string;
  price: number;
  ratings: number;
  off:number;
  quantity: number;
  description:string;
  imageLink:string;
  isDeleted: boolean;
};

export interface ProductModel extends Model<TProduct> {
  isProductExists(name: string): Promise<boolean>;
}

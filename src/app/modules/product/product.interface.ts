import { Model } from 'mongoose';

export type TProduct = {
  name: string;
  brand: string;
  category: string;
  price: number;
  ratings: number;
  off?:number;
  quantity: number;
  description:string;
  imageLink:string;
  isDeleted: boolean;
};

export interface ProductModel extends Model<TProduct> {
  // eslint-disable-next-line no-unused-vars
  isProductExists(id: string): Promise<boolean>;
}

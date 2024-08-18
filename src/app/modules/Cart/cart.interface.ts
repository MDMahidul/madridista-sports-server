import { Types } from 'mongoose';

export type TCartItem = {
  product: Types.ObjectId;
  quantity: number;
};

export type TCart = {
  user: string;
  items: TCartItem[];
};

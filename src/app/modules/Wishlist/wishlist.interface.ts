import { Types } from 'mongoose';

export type TWishItem = {
  product: Types.ObjectId;
};

export type TWishlist = {
  user: string;
  items: TWishItem[];
};

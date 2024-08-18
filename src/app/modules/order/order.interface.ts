import { TUser } from '../User/user.interface';

export type TCartItem = {
  productId: string;
  quantity: number;
};

export type TCustomerOrderInfo = {
  customer: TUser;
  cartItems: TCartItem[];
};

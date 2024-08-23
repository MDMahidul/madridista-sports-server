export type TCartItem = {
  product: string;
  quantity: number;
};

export type TCustomerOrderInfo = {
  user: string;
  phoneNumber: string;
  address: string;
  paymentMethod: string;
  items: TCartItem[];
  totalPrice: number;
};

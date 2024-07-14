export type TCartItem ={
  _id: string;
  name: string;
  imageLink: string;
  price: number;
  quantity: number;
}

export type TCustomerOrderInfo = {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  cartItems: TCartItem[];
}

export interface User {
  fullname: string;
  email: string;
  mobile: number;
  password: string;
  role: string;
  _id: string;
}
export interface UserLogin {
  email: string;
  password: string;
}

export interface Token {
  token: string;
}

export interface Category {
  _id: string;
  title: string;
  image: string;
}
export interface Rating {
  _id: string;
  rating: number;
  comment: string;
  subject: string;
  productId: string;
}
export interface Product {
  _id: string;
  title: string;
  price: number;
  stock: number;
  category: string;
  thumbnail: string;
  description: string;
  brand: string;
  color: string;
  slug: string;
  ratings: Rating;
}
export interface Cart {
  _id: string;
  productId: string;
  quantity: number;
  color: string;
  size: string;
  price: number;
  image: string;
  title: string;
}

export interface Address {
  _id:string,
  user:string,
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: number;
}

export interface AddressFormValues {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: number;
  Id:string
}

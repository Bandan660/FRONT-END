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

export interface category {
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

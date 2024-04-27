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

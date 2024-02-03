export interface AuthResponse<T> {
  $id: string;
  code: number;
  message: string;
  data: T;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
}

// * for login
export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponseData {
  $id: string;
  Id: string;
  Name: string;
  Email: string;
  Token: string;
}

// * for register
export interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponseData {
  id: string;
  email: string;
  name: string;
}

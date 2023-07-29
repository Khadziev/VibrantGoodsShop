export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface UserAttributes {
  name: string;
  login: string;
  password: string;
  role: UserRole;
  userId?: string;
}

export interface LoginData {
  login: string;
  password: string;
  role: UserRole;
  userId: string;
}

export interface AuthState {
  data: DataAttributesApi[];
  user: UserAttributes | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  role: UserRole | null;
  name: string;
  userId: string | null;
}

export interface Specifications {
  processor?: string;
  memory?: string;
  storage?: string;
  screen?: string;
  camera?: string;
}

export interface DataAttributesApi {
  _id?: string;
  name: string;
  price: number;
  description: string;
  title: string;
  category: string;
  imageURL: string[];
  discount: number;
  specifications: Specifications;
}



// карзина
export interface CartItem {
  _id: string;
  productId: string;
  imageURL: string;
  price: number;
  product: DataAttributesApi;
}

export interface CartAttributes {
  userId: string;
  items: CartItem[];
}

export interface RemoveFromCartArgs {
  userId: string;
  productId: string;
}

// слайдер
export interface Slide {
  ID: number;
  title: string;
  description: string;
  bgImg: string;
  url: string;
}
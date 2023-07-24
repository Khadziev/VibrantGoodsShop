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

export interface DataAttributesApi {
  _id?: string;
  name: string;
  price: number;
  description: string;
  title: string;
  category: string;
  imageURL: string;
}


// карзина
export interface CartItem {
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
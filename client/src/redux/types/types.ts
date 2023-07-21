export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface UserAttributes {
  name: string;
  login: string;
  password: string;
  role: UserRole;
}

export interface LoginData {
  login: string;
  password: string;
  role: UserRole;
}

export interface AuthState {
  data: DataAttributesApi[];
  user: UserAttributes | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  role: UserRole | null;
  name: string;
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

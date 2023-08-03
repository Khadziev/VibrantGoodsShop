import { DataAttributesApi } from "./ProductTypes";


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
  token?: string;
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


// удаления изменения пользователя
export interface UserUpdateAttributes {
  name?: string;
  login?: string;
  password?: string;
  userId?: string
}




// слайдер
export interface Slide {
  ID: number;
  title: string;
  description: string;
  bgImg: string;
  url: string;
}
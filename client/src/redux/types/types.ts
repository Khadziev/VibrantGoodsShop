

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
    role: UserRole
  }

export interface AuthState {
    data: DataAttributes[];
    user: UserAttributes | null;
    loading: boolean;
    error: string | null;
    token: string | null;
    role: UserRole | null;
    name: string;
  }


export interface DataAttributes {
    _id?: string;
    name: string;
    price: number;
    description: string;
    title: string;
    category: string;
    imageURL: string;
  }


export interface DataAttributesApi {
    id: string;
    name: string;
    price: number;
    description: string;
    title: string;
    category: string;
    imageURL: string;
    createdAt: string | number | Date
  }
import { DataAttributesApi } from "@/components/Admin/product/model/model";

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

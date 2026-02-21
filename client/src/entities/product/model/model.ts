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

export interface Message {
  body: string;
  createdAt?: string;
  image: string;
}

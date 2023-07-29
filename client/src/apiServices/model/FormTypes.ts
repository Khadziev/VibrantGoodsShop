import { DataAttributesApi } from "./types";

export const initialFormData: DataAttributesApi = {
  name: '',
  price: 0,
  description: '',
  title: '',
  category: '',
  imageURL: ['', '', ''],
  discount: 0,
  specifications: {
    processor: '',
    memory: '',
    storage: '',
    screen: '',
    camera: '',
  },
};
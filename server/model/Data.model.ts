import mongoose, { Document, Model, Schema } from 'mongoose';

interface Specifications {
  processor?: string;
  memory?: string;
  storage?: string;
  screen?: string;
  camera?: string;
}

export interface DataAttributes {
  name: string;
  price: number;
  description: string;
  title: string;
  category: 'Ноутбуки' | 'Камеры' | 'Наушники' | 'Планшеты' | 'Сотовые телефоны' | 'Аксессуары'
  imageURL: string[];
  discount: number;
  specifications: Specifications;
}

interface DataDocument extends Document, DataAttributes {}

const dataSchema: Schema<DataDocument> = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      required: false,
      enum: ['Ноутбуки', 'Камеры', 'Наушники', 'Планшеты', 'Сотовые телефоны', 'Аксессуары'],
    },
    imageURL: [{
      type: String,
      required: false,
    }],
    discount: {
      type: Number,
      required: false,
      default: 0, 
    },
    specifications: {
      processor: { type: String, default: null },
      memory: { type: String, default: null },
      storage: { type: String, default: null },
      screen: { type: String, default: null },
      camera: { type: String, default: null }
    },
  },
  { timestamps: true }
);

const Data: Model<DataDocument> = mongoose.model<DataDocument>('Data', dataSchema);

export default Data;

import mongoose, { Document, Model, Schema } from 'mongoose';

export interface DataAttributes {
  name: string;
  price: number;
  description: string;
  title: string;
  category: 'Ноутбуки' | 'Камеры' | 'Наушники' | 'Планшеты' | 'Сотовые телефоны' | 'Аксессуары'
  imageURL: string;
  discount: number;
  
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
      required: false,
    },
    category: {
      type: String,
      required: false,
      enum: ['Ноутбуки', 'Камеры', 'Наушники', 'Планшеты', 'Сотовые телефоны', 'Аксессуары'],
    },
    imageURL: {
      type: String,
      required: false,
    },
    discount: {
      type: Number,
      required: false,
      default: 0, 
    },
  },
  { timestamps: true }
);

const Data: Model<DataDocument> = mongoose.model<DataDocument>('Data', dataSchema);

export default Data;

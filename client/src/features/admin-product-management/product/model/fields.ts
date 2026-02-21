import { DataAttributesApi } from '@/entities/product/model/model';

export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'select';
  required?: boolean;
  options?: string[];
}

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

export const productFields: FieldConfig[] = [
  { name: 'name', label: 'Название', type: 'text' },
  { name: 'price', label: 'Цена', type: 'number' },
  { name: 'description', label: 'Описание', type: 'textarea' },
  { name: 'title', label: 'Заголовок', type: 'text' },

  { name: 'imageURL[0]', label: 'URL 1', type: 'text' },
  { name: 'imageURL[1]', label: 'URL 2', type: 'text' },
  { name: 'imageURL[2]', label: 'URL 3', type: 'text' },

  { name: 'discount', label: 'Скидка', type: 'number' },

  { name: 'specifications.processor', label: 'Процессор', type: 'text' },
  { name: 'specifications.memory', label: 'Память', type: 'text' },
  { name: 'specifications.storage', label: 'Хранилище', type: 'text' },
  { name: 'specifications.screen', label: 'Экран', type: 'text' },
  { name: 'specifications.camera', label: 'Камера', type: 'text' },

  {
    name: 'category',
    label: 'Категория',
    type: 'select',
    options: ['Ноутбуки', 'Камеры', 'Наушники', 'Планшеты', 'Сотовые телефоны', 'Аксессуары'],
  },
];

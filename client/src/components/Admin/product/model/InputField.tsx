import React from "react";
import { DataAttributesApi } from "@/components/Admin/product/model/model";

interface InputFieldProps {
    id: string;
    type: string;
    name: string;
    label: string;
    required: boolean;
    value: string;
    className: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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

export const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  name,
  label,
  required,
  value,
  className,
  onChange,
}) => (
  <div className="w-1/2 px-2 mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={className}
    />
  </div>
);

// для AddProductForm
export const fields = [
  { id: 'name', type: 'text', name: 'name', label: 'Название', required: false },
  { id: 'price', type: 'number', name: 'price', label: 'Цена', required: false },
  { id: 'description', type: 'textarea', name: 'description', label: 'Описание', required: false },
  { id: 'title', type: 'text', name: 'title', label: 'Заголовок', required: true },
  { id: 'imageURL0', type: 'text', name: 'imageURL0', label: 'URL из... 1', required: false },
  { id: 'imageURL1', type: 'text', name: 'imageURL1', label: 'URL из... 2', required: false },
  { id: 'imageURL2', type: 'text', name: 'imageURL2', label: 'URL из... 3', required: false },
  { id: 'discount', type: 'number', name: 'discount', label: 'Скидка', required: false },
  { id: 'specifications.processor', type: 'text', name: 'specifications.processor', label: 'Процессор', required: true },
  { id: 'specifications.memory', type: 'text', name: 'specifications.memory', label: 'Память', required: false },
  { id: 'specifications.storage', type: 'text', name: 'specifications.storage', label: 'Хранилище', required: false },
  { id: 'specifications.screen', type: 'text', name: 'specifications.screen', label: 'Экран', required: false },
  { id: 'specifications.camera', type: 'text', name: 'specifications.camera', label: 'Камера', required: false },
  { id: 'category', type: 'select', name: 'category', label: 'Категория', required: false, options: ['Ноутбуки', 'Камеры', 'Наушники', 'Планшеты', 'Сотовые телефоны', 'Аксессуары'] }

];

// для ProductEditModal
export const generalFields = [
  { name: 'name', label: 'Название' },
  { name: 'price', label: 'Цена', type: 'number' },
  { name: 'description', label: 'Описание' },
  { name: 'title', label: 'Заголовок' },
  { name: 'category', label: 'Категория', type: 'select' },
  { name: 'discount', label: 'Скидка', type: 'number' }
];

export const specificationFields = [
  { name: 'processor', label: 'Процессор' },
  { name: 'memory', label: 'Память' },
  { name: 'storage', label: 'Хранилище' },
  { name: 'screen', label: 'Экран' },
  { name: 'camera', label: 'Камера' },
];

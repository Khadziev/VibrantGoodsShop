import React from 'react';

interface SortingFieldsProps {
  selectedField: string;
  onFieldChange: (field: string) => void;
}

const SortingFields: React.FC<SortingFieldsProps> = ({ selectedField, onFieldChange }) => {
  return (
    <div>
      <ul className="flex flex-wrap space-x-4 justify-center">
        <li>
          <button
            type="button"
            className={`border px-4 py-2 rounded-lg ${
              selectedField === '' ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
            onClick={() => onFieldChange('')}
          >
            Все
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`border px-4 py-2 rounded-lg ${
              selectedField === 'Ноутбуки' ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
            onClick={() => onFieldChange('Ноутбуки')}
          >
            Ноутбуки
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`border px-4 py-2 rounded-lg ${
              selectedField === 'Камеры' ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
            onClick={() => onFieldChange('Камеры')}
          >
            Камеры
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`border px-4 py-2 rounded-lg ${
              selectedField === 'Наушники' ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
            onClick={() => onFieldChange('Наушники')}
          >
            Наушники
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`border px-4 py-2 rounded-lg ${
              selectedField === 'Планшеты' ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
            onClick={() => onFieldChange('Планшеты')}
          >
            Планшеты
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`border px-4 py-2 rounded-lg ${
              selectedField === 'Сотовые телефоны' ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
            onClick={() => onFieldChange('Сотовые телефоны')}
          >
            Сотовые телефоны
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`border px-4 py-2 rounded-lg ${
              selectedField === 'Аксессуары' ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
            onClick={() => onFieldChange('Аксессуары')}
          >
            Аксессуары
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SortingFields;

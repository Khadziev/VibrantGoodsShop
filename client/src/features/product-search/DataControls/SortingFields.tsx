import React, { memo, useCallback } from 'react';

interface SortingFieldsProps {
  selectedField: string;
  onFieldChange: (field: string) => void;
}

const CATEGORIES = [
  { id: '', name: 'Все' },
  { id: 'Ноутбуки', name: 'Ноутбуки' },
  { id: 'Камеры', name: 'Камеры' },
  { id: 'Наушники', name: 'Наушники' },
  { id: 'Планшеты', name: 'Планшеты' },
  { id: 'Сотовые телефоны', name: 'Сотовые телефоны' },
  { id: 'Аксессуары', name: 'Аксессуары' },
] as const;

const SortingFields: React.FC<SortingFieldsProps> = memo(({ selectedField, onFieldChange }) => {
  const handleFieldChange = useCallback(
    (fieldId: string) => {
      onFieldChange(fieldId);
    },
    [onFieldChange]
  );
  return (
    <div className="py-2">
      <ul className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((category) => (
          <li key={category.id}>
            <button
              type="button"
              onClick={() => handleFieldChange(category.id)}
              className={`
                px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                ${
          selectedField === category.id
            ? 'bg-[rgb(var(--color-primary))] text-white shadow-sm'
            : 'bg-[rgb(var(--color-bg-tertiary))] text-[rgb(var(--color-text-base))] hover:bg-[rgb(var(--color-bg-secondary))]'
          }
              `}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

SortingFields.displayName = 'SortingFields';

export default SortingFields;

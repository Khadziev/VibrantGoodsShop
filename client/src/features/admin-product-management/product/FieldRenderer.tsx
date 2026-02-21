/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FieldConfig } from './model/fields';
import { get, set } from './utils/path';

interface Props {
  field: FieldConfig;
  formData: any;
  setFormData: (data: any) => void;
}

export const FieldRenderer: React.FC<Props> = ({ field, formData, setFormData }) => {
  const value = get(formData, field.name);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const inputValue = field.type === 'number' ? Number(e.target.value) : e.target.value;
    setFormData(set(formData, field.name, inputValue));
  };

  const common = {
    value: value ?? '',
    required: field.required,
    onChange: handleChange,
    className: 'w-full border rounded p-2 bg-white text-black',
  };

  switch (field.type) {
  case 'textarea':
    return <textarea {...common} />;
  case 'select':
    return (
      <select {...common}>
        <option value="">Выберите...</option>
        {field.options?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  default:
    return <input type={field.type} {...common} />;
  }
};

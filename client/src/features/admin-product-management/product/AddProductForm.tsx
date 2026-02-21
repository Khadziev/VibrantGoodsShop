import React, { useState } from 'react';
import { useAddDataMutation } from '@/shared/api/adminApi';

import { DataAttributesApi } from '@/entities/product/model/model';
import { FieldRenderer } from './FieldRenderer';
import { initialFormData, productFields } from './model/fields';
import Text from '@/shared/ui/Text/Text';

interface AddProductFormProps {
  onCancel: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onCancel }) => {
  const [formData, setFormData] = useState<DataAttributesApi>(initialFormData);
  const [addData] = useAddDataMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addData(formData).unwrap();
      setFormData(initialFormData);
    } catch (err) {
      console.log('Ошибка при добавлении товара', err);
    }
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) onCancel();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30"
      onClick={handleOutsideClick}
    >
      <div className="w-11/12 max-w-2xl max-h-[90vh] bg-white rounded-lg p-6 overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <Text
            text="Добавить товар"
            size="xl"
            color="black"
            className="mb-6 font-bold text-center"
          />

          <div className="flex flex-wrap -mx-2">
            {productFields.map((field) => (
              <div key={field.name} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-4">
                <Text text={field.label} size="sm" color="black" className="mb-1" />
                <FieldRenderer field={field} formData={formData} setFormData={setFormData} />
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Добавить
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="ml-2 bg-gray-300 py-2 px-4 rounded hover:bg-gray-400"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;

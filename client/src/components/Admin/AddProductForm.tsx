import React, { useState } from 'react';
import { DataAttributesApi } from '../../apiServices/model/types';
import { InputField, fields } from '../../apiServices/model/InputField';
import { initialFormData } from '../../apiServices/model/FormTypes';
import { useAddDataMutation } from '../../apiServices/api/adminApi';


interface AddProductFormProps {
  onCancel: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onCancel }) => {
  const [formData, setFormData] = useState<DataAttributesApi>(initialFormData);
  const [addData] = useAddDataMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.name.startsWith('imageURL')) {
      const index = parseInt(e.target.name.replace('imageURL', ''), 10);
      const newImageURL = [...formData.imageURL];
      newImageURL[index] = e.target.value;
      setFormData({
        ...formData,
        imageURL: newImageURL,
      });
    } else if (e.target.name.startsWith('specifications')) {
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          [e.target.name.split('.')[1]]: e.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addData(formData).unwrap();
      setFormData(initialFormData);
    } catch (error) {
      console.log('Ошибка при добавлении данных', error);
    }
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onCancel();
    }
  }

  return (
    <div className="fixed inset-0" onClick={handleOutsideClick}>
      <div className="w-11/12 h-5/6 mx-auto mt-10 p-4 overflow-y-auto bg-white rounded-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-bold mb-4">Добавить товар</h2>
          <div className="flex flex-wrap -mx-2">
            {fields.map((field) => (
              <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-4" key={field.id}>
                <InputField
                  id={field.id}
                  type={field.type}
                  name={field.name}
                  label={field.label}
                  required={field.required}
                  value={
                    field.name.startsWith('imageURL')
                      ? formData.imageURL[parseInt(field.name.replace('imageURL', ''), 10)]
                      : field.name.startsWith('specifications')
                        ? formData.specifications[field.name.split('.')[1]]
                        : formData[field.name]
                  }
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Добавить
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
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

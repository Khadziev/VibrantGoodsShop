/* eslint-disable no-unused-vars */
import React from 'react';
import { FieldRenderer } from './FieldRenderer';
import { productFields } from './model/fields';
import { DataAttributesApi } from '@/entities/product/model/model';
import { get, set } from './utils/path';

type ProductEditModalProps = {
  selectedProduct: DataAttributesApi | null;
  isModalOpen: boolean;
  setSelectedProduct: (product: DataAttributesApi | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  onUpdate: (updatedData: DataAttributesApi) => void;
};

const ProductEditModal: React.FC<ProductEditModalProps> = ({
  selectedProduct,
  isModalOpen,
  setSelectedProduct,
  setIsModalOpen,
  onUpdate,
}) => {
  if (!selectedProduct) return null;

  const handleChange = (path: string, value: unknown) => {
    const updated = set(selectedProduct, path, value) as DataAttributesApi;
    setSelectedProduct(updated);
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) setIsModalOpen(false);
  };

  return (
    <div
      onClick={handleOutsideClick}
      className={`fixed inset-0 z-50 bg-black/30 ${isModalOpen ? 'flex' : 'hidden'}`}
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg shadow-md p-6 max-w-full h-5/6 overflow-y-auto"
        >
          <form>
            <h2 className="text-2xl font-semibold mb-4">Редактировать продукт</h2>

            <div className="flex flex-wrap -m-2">
              {productFields.map((field) => (
                <div key={field.name} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                  <FieldRenderer
                    field={field}
                    formData={selectedProduct}
                    setFormData={(updated) => handleChange(field.name, get(updated, field.name))}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="border border-gray-300 rounded-lg px-4 py-2 mr-2"
              >
                Отмена
              </button>

              <button
                type="button"
                onClick={() => onUpdate(selectedProduct)}
                className="border border-gray-300 rounded-lg px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
              >
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEditModal;

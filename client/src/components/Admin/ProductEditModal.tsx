import React from "react";
import { DataAttributesApi } from "../../redux/model/types";
import { generalFields, specificationFields } from "../../hooks/InputField";

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



  const handleFieldChange = (name, value) => {
    setSelectedProduct({ ...selectedProduct, [name]: value });
  }

  const handleSpecsFieldChange = (name, value) => {
    setSelectedProduct({
      ...selectedProduct,
      specifications: { ...selectedProduct.specifications, [name]: value }
    });
  }

  const handleImageUrlChange = (index: number, value: string) => {
    if (selectedProduct && selectedProduct.imageURL) {
      const newImageURLs = [...selectedProduct.imageURL];
      newImageURLs[index] = value;
      setSelectedProduct({ ...selectedProduct, imageURL: newImageURLs });
    }
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      setIsModalOpen(false);
    }
  }

  return (
    <div onClick={handleOutsideClick} className={`fixed inset-0 z-50 ${isModalOpen ? "flex" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-md p-6 max-w-md w-full max-h-80 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4">Редактировать продукт</h2>
          <form>
            <div className="flex flex-wrap -m-2">
              {generalFields.map(field => (
                <div className="w-full md:w-1/2 p-2">
                  <label className="block text-gray-700 font-bold mb-2">
                    {field.label}:
                  </label>
                  {field.type !== 'select' ? (
                    <input
                      type={field.type || 'text'}
                      value={selectedProduct[field.name]}
                      onChange={e => handleFieldChange(field.name, e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 w-full"
                    />
                  ) : (
                    <select
                      value={selectedProduct[field.name]}
                      onChange={e => handleFieldChange(field.name, e.target.value)}
                      className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 w-full"
                    >
                      <option value="Ноутбуки">Ноутбуки</option>
                      <option value="Камеры">Камеры</option>
                      <option value="Наушники">Наушники</option>
                      <option value="Планшеты">Планшеты</option>
                      <option value="Сотовые телефоны">Сотовые телефоны</option>
                      <option value="Аксессуары">Аксессуары</option>
                    </select>
                  )}
                </div>
              ))}

              {selectedProduct.imageURL.map((url, index) => (
                <div className="w-full md:w-1/2 p-2" key={index}>
                  <label className="block text-gray-700 font-bold mb-2">
                    Изображение {index + 1}:
                  </label>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 w-full"
                  />

                </div>
              ))}

              {specificationFields.map(field => (
                <div className="w-full md:w-1/2 p-2">
                  <label className="block text-gray-700 font-bold mb-2">
                    {field.label}:
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.specifications[field.name]}
                    onChange={e => handleSpecsFieldChange(field.name, e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 w-full"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={() => onUpdate(selectedProduct)}
                className="border border-gray-300 rounded-lg px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
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

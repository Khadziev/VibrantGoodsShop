import React from "react";
import { DataAttributesApi } from "../../redux/types/types";

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
  return (
    <>
      {selectedProduct && (
        <div className={`fixed inset-0 z-50 ${isModalOpen ? "flex" : "hidden"}`}>
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
              <h2 className="text-2xl font-semibold mb-4">Редактировать продукт</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Название:
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.name}
                    onChange={(e) =>
                      setSelectedProduct({ ...selectedProduct, name: e.target.value })
                    }
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Цена:
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.price}
                    onChange={(e) =>
                      setSelectedProduct({ ...selectedProduct, price: Number(e.target.value) })
                    }
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Описание:
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.description}
                    onChange={(e) =>
                      setSelectedProduct({ ...selectedProduct, description: e.target.value })
                    }
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Заголовок:
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.title}
                    onChange={(e) =>
                      setSelectedProduct({ ...selectedProduct, title: e.target.value })
                    }
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Изображение:
                  </label>
                  <input
                    type="text"
                    value={selectedProduct.imageURL}
                    onChange={(e) =>
                      setSelectedProduct({ ...selectedProduct, imageURL: e.target.value })
                    }
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Категория:
                  </label>
                  <select
                    value={selectedProduct.category}
                    onChange={(e) =>
                      setSelectedProduct({ ...selectedProduct, category: e.target.value })
                    }
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:border-blue-500 w-full"
                  >
                    <option value="Ноутбуки">Ноутбуки</option>
                    <option value="Камеры">Камеры</option>
                    <option value="Наушники">Наушники</option>
                    <option value="Планшеты">Планшеты</option>
                    <option value="Сотовые телефоны">Сотовые телефоны</option>
                    <option value="Аксессуары">Аксессуары</option>
                  </select>
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
      )}
    </>
  );
};

export default ProductEditModal;

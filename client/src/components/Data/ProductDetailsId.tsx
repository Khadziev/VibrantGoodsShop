import React, { memo, useState } from "react";
import { useFetchProductByIdQuery } from "../../apiServices/api/userApi";
import { useParams } from "react-router-dom";
import AddToCartComponent from "../Basket/AddToCartComponent";
import ReviewsModal from "../Review/ReviewsModal";
import BackButton from "../../UI/BackButton/BackButton";
import SimilarProducts from "../SimilarProducts/SimilarProducts";
import Loading2 from "../../UI/Loading/Loading2";

const UserProductDetails: React.FC = memo(() => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useFetchProductByIdQuery(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div>
        <Loading2 />
      </div>
    );
  }

  if (isError) {
    return <div>Ошибка при получении данных</div>;
  }

  if (!data) {
    return <div>Товар не найден</div>;
  }

  const product = data;

  const handleImageChange = (index: number) => {
    setSelectedImage(index);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 pt-23">
      <BackButton />
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden pt-7">
        <div className="w-1/2 p-8">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <img src={product.imageURL[selectedImage]} className="object-contain w-full h-96 rounded-md shadow-lg" />
          <div className="flex space-x-2 mt-2">
            {product.imageURL.map((img, index) => (
              <div
                key={index}
                className={`h-16 w-16 rounded-full border-2 ${
                  index === selectedImage ? "border-blue-500" : "border-gray-300"
                } cursor-pointer`}
                onClick={() => handleImageChange(index)}
              >
                <img src={img} alt={`product ${index}`} className="object-contain w-full h-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 p-8">
          <div className="font-bold text-2xl mb-4">{product.name}</div>
          <h2 className="font-bold text-lg mb-4">Информация о продукте</h2>
          <p className="text-gray-700 mb-4">Цена: ${product.price}</p>
          <p className="text-gray-700 mb-4">Камера: {product.specifications.camera || "Нет"}</p>
          <p className="text-gray-700 mb-4">Память: {product.specifications.memory || "Нет"}</p>
          <p className="text-gray-700 mb-4">Процессор: {product.specifications.processor || "Нет"}</p>
          <p className="text-gray-700 mb-4">Экран: {product.specifications.screen || "Нет"}</p>
          <p className="text-gray-700 mb-4">Хранилище: {product.specifications.storage || "Нет"}</p>
          <AddToCartComponent product={product} />
          <div className="mt-8 flex justify-center">
            <button onClick={handleOpenModal} className="bg-blue-500 text-white p-2 rounded">
              Смотреть отзывы пользователей
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="font-bold text-2xl mb-4 text-customColorTextBase">Описание</h2>
        <p className=" text-customColorTextBase">{product.description}</p>
      </div>
      <ReviewsModal productId={id} isOpen={isModalOpen} onClose={handleCloseModal} />
      <SimilarProducts productId={id} />
    </div>
  );
});

export default UserProductDetails;

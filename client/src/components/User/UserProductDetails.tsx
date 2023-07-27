import React, { useState } from 'react';
import { useFetchProductByIdQuery } from '../../redux/api/userApi';
import { useParams } from 'react-router-dom';
import Loading from '../CommonComponents/Loading';
import { MdShoppingCart } from 'react-icons/md';
import AddToCartComponent from '../Basket/AddToCartComponent';

const UserProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useFetchProductByIdQuery(id);

  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return <div><Loading/></div>;
  }

  if (isError) {
    return <div>Ошибка при получении данных</div>;
  }

  if (!data) {
    return <div>Product not found</div>;
  }

  const product = data;

  const handleImageChange = (index: number) => {
    setSelectedImage(index);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-1/2 p-8">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <img
            src={product.imageURL[selectedImage]}
            className="object-contain w-full h-96 rounded-md shadow-lg"
          />
          <div className="flex space-x-2 mt-2">
            {product.imageURL.map((img, index) => (
              <div
                key={index}
                className={`h-16 w-16 rounded-full border-2 ${index === selectedImage ? 'border-blue-500' : 'border-gray-300'} cursor-pointer`}
                onClick={() => handleImageChange(index)}
              >
                <img src={img} alt={`product ${index}`} className="object-contain w-full h-full rounded-full"/>
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
          <div className="border border-black rounded-full p-1 inline-flex items-center justify-center mt-4">
            <MdShoppingCart size={24} />
          </div>
          <AddToCartComponent product={product} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="font-bold text-2xl mb-4">Описание</h2>
        <p className="text-gray-700">{product.description}</p>
      </div>
    </div>
  );
};

export default UserProductDetails;

import React from 'react';
import { useFetchProductByIdQuery } from '../../redux/api/userApi';
import { useParams } from 'react-router-dom';

const UserProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useFetchProductByIdQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Ошибка при получении данных</div>;
  }

  if (!data) {
    return <div>Product not found</div>;
  }

  const product = data;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <div className="mb-4">
        <img
          src={product.imageURL}
          alt={product.title}
          className="object-contain w-full h-96 rounded-md shadow-lg"
        />
      </div>
      <p className="text-lg mb-2">{product.description}</p>
      <p className="text-xl font-semibold">Price: {product.price}</p>
    </div>
  );
};

export default UserProductDetails;

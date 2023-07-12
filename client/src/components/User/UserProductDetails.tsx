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
    <div>
      <h1>{product.title}</h1>
      <img src={product.imageURL} alt={product.title} />
      <p>{product.description}</p>
      <p>Price: {product.price}</p>

    </div>
  );
};

export default UserProductDetails;

import React, { useState, useEffect } from 'react';
import { DataAttributesApi } from '../../redux/model/types';
import { useAddToCartMutation, useGetCartByUserIdQuery } from '../../redux/api/apiCart';
import { useAppSelector } from '../../redux/store';
import { FaShoppingCart } from 'react-icons/fa';



interface AddToCartComponentProps {
  product: DataAttributesApi;
}

const AddToCartComponent: React.FC<AddToCartComponentProps> = ({ product }) => {
  const [addToCart, { isLoading, isError }] = useAddToCartMutation();
  const userId = useAppSelector((state) => state.auth.userId);

  const { data: cartData } = useGetCartByUserIdQuery(userId || '', { skip: !userId });

  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    if (cartData) {
      setIsInCart(cartData.items.some(item => item.productId === product._id));
    }
  }, [cartData, product]);

  const handleAddToCart = () => {
    if (!userId) {
      console.error('userId не определен');
      return;
    }

    const cartItem = {
      userId: userId,
      productId: product._id,
      price: product.price,
      imageURL: product.imageURL
    };

    addToCart(cartItem)
      .unwrap()
      // .then((response) => {
      //   console.log('Товар успешно добавлен в корзину:', response);
      //   setIsInCart(true);
      // })
      .catch((error) => {
        console.error('Произошла ошибка при добавлении в корзину:', error);
      });
  };

  return (
    <div>
      <button onClick={handleAddToCart} disabled={isLoading || isInCart} >
        {isLoading ? 'Добавление...' : isInCart ? 'добавлено' : <FaShoppingCart/>}
      </button>
      {isError && <p>Произошла ошибка при добавлении в корзину</p>}
    </div>
  );
};

export default AddToCartComponent;

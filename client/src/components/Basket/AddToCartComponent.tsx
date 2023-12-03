import React, { useState, useEffect } from 'react';
import { useAddToCartMutation, useGetCartByUserIdQuery } from '@/apiServices/api/apiCart';
import { useAppSelector } from '@/app/providers/store';
import { MdShoppingCart } from 'react-icons/md';
import { DataAttributesApi } from "@/components/Admin/product/model/model";




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
    <div className="border border-black rounded-full p-1 inline-flex items-center justify-center mt-4">
      <button onClick={handleAddToCart} disabled={isLoading || isInCart} >
        {isLoading ? 'Добавление...' : isInCart ? 'добавлено' : <MdShoppingCart size={30} />}
      </button>
      {isError && <p>Произошла ошибка при добавлении в корзину</p>}
    </div>
  );
};

export default AddToCartComponent;

import React from 'react';
import { useGetCartByUserIdQuery } from '@/entities/cart/api/apiCart';
import { useAppSelector } from '@/app/providers/store';
import CartItemsList from './CartItemsList';
import Loading from '@/shared/ui/Loading/Loading';
import Text from '@/shared/ui/Text/Text';

const CartComponent: React.FC = () => {
  const userId = useAppSelector((state) => state.auth.userId);

  const {
    data: cart,
    isLoading,
    isError,
  } = useGetCartByUserIdQuery(userId || '', { skip: !userId });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (isError || !userId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Text text="Ошибка при загрузке корзины" color="red" />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Text text="Корзина пуста" color="black" size="xl" />
      </div>
    );
  }

  const cartItems = cart.items;

  return (
    <div className="container mx-auto px-4 py-8">
      <Text text="Ваша корзина" size="sm" color="black" />
      <CartItemsList cartItems={cartItems} />
    </div>
  );
};

export default CartComponent;

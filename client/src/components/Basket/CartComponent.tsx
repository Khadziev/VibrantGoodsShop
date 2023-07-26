import React, { useEffect } from 'react';
import { useGetCartByUserIdQuery } from '../../redux/api/apiCart';
import { useAppSelector } from '../../redux/store';
import CartItemsList from './CartItemsList';
import Loading from '../CommonComponents/Loading';

const CartComponent: React.FC = () => {
  const userId = useAppSelector((state) => state.auth.userId);

  const { data: cart, isLoading, isError } = useGetCartByUserIdQuery(userId);

  useEffect(() => {
    // DataAttributesApi[]
  }, [userId]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><Loading/></div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen">Ошибка при получении данных корзины.</div>;
  }

  if (!cart || cart.items.length === 0) {
    return <div className="flex justify-center items-center h-screen">Корзина пуста.</div>;
  }

  const cartItems = cart.items;

  return (
    <div className="flex justify-center items-center h-screen flex-wrap">
      <CartItemsList cartItems={cartItems} />
    </div>
  );
};

export default CartComponent;
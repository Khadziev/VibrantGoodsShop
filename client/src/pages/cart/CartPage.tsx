import React from 'react';
import { useGetCartByUserIdQuery } from '@/entities/cart/api/apiCart';
import { useAppSelector } from '@/app/providers/store';
import CartItemsList from '@/entities/cart/ui/Basket/CartItemsList';
import { Loading, Alert, Container } from '@/shared/ui';

const CartPage: React.FC = () => {
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
      <Container maxWidth="md">
        <div className="flex justify-center items-center min-h-screen py-12">
          <Alert variant="error" title="Ошибка">
            Ошибка при загрузке корзины
          </Alert>
        </div>
      </Container>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Container maxWidth="md">
        <div className="flex flex-col items-center justify-center min-h-screen py-12">
          <Alert variant="info" title="Корзина пуста">
            Добавьте товары в корзину для продолжения
          </Alert>
        </div>
      </Container>
    );
  }

  return <CartItemsList cartItems={cart.items} />;
};

export default CartPage;

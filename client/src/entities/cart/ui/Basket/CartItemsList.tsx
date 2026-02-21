import React, { useMemo, useCallback, memo } from 'react';
import { useRemoveFromCartMutation } from '@/entities/cart/api/apiCart';
import { useAppSelector } from '@/app/providers/store';
import { NavLink } from 'react-router-dom';
import { BackButton, Button, Card, Container, Badge, IconButton } from '@/shared/ui';
import { CartItem } from '@/entities/cart/ui/Basket/model/model';
import { toast } from 'react-toastify';
import {
  AiOutlineDelete,
  AiOutlineShopping,
  AiOutlineArrowRight,
  AiOutlineSafety,
} from 'react-icons/ai';

interface CartItemsListProps {
  cartItems: CartItem[];
}

const CartItemsList: React.FC<CartItemsListProps> = memo(({ cartItems }) => {
  const [removeFromCart, { isLoading: isRemoving }] = useRemoveFromCartMutation();
  const userId = useAppSelector((state) => state.auth.userId);

  const formatPrice = useCallback(
    (price: number) => new Intl.NumberFormat('ru-RU').format(Math.round(price)),
    []
  );

  const handleRemoveFromCart = useCallback(
    async (productId: string) => {
      if (!userId) {
        toast.error('Ошибка: пользователь не авторизован');
        return;
      }

      try {
        await removeFromCart({ userId, productId }).unwrap();
        toast.success(`Товар удален из корзины`);
      } catch (error) {
        console.error(error);
        toast.error('Не удалось удалить товар');
      }
    },
    [userId, removeFromCart]
  );

  const total = useMemo(() => cartItems.reduce((sum, item) => sum + item.price, 0), [cartItems]);

  if (!cartItems.length) {
    return (
      <Container maxWidth="md">
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
          <Card variant="elevated" padding="lg" className="text-center">
            <div className="bg-gray-100 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <AiOutlineShopping size={48} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ваша корзина пуста</h2>
            <p className="text-gray-500 mb-8">
              Посмотрите наш каталог, чтобы найти что-то особенное.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => (window.location.href = '/data/all')}
              fullWidth
            >
              Перейти в каталог
            </Button>
          </Card>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <Container maxWidth="2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Корзина</h1>
            <Badge variant="primary" size="lg">
              {cartItems.length} шт.
            </Badge>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-2/3 space-y-4">
            {cartItems.map((item, index) => (
              <Card
                key={`${item.productId}-${index}`}
                variant="elevated"
                padding="md"
                hover
                className="group flex flex-col sm:flex-row items-center gap-6"
              >
                <NavLink
                  to={`/data/${item.productId}`}
                  className="shrink-0 w-full sm:w-32 h-32 bg-gray-50 rounded-xl overflow-hidden"
                >
                  <img
                    src={item.imageURL}
                    alt={item.productId}
                    className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                </NavLink>

                <div className="flex-grow text-center sm:text-left w-full">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <NavLink
                        to={`/data/${item.productId}`}
                        className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                      >
                        Товар {index + 1}
                      </NavLink>
                      <p className="text-sm text-gray-500 mt-1">
                        Артикул: {item.productId.slice(-6)}
                      </p>
                    </div>

                    <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-1 justify-between w-full sm:w-auto mt-4 sm:mt-0 border-t sm:border-0 pt-4 sm:pt-0 border-gray-100">
                      <span className="text-xl font-bold text-gray-900 whitespace-nowrap">
                        {formatPrice(item.price)} ₽
                      </span>

                      <IconButton
                        onClick={() => handleRemoveFromCart(item.productId)}
                        disabled={isRemoving}
                        variant="ghost"
                        size="md"
                        icon={<AiOutlineDelete size={20} />}
                        aria-label="Удалить из корзины"
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="w-full lg:w-1/3 sticky top-24">
            <Card variant="elevated" padding="lg">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Детали заказа</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-500">
                  <span>Товары ({cartItems.length})</span>
                  <span>{formatPrice(total)} ₽</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Скидка</span>
                  <span className="text-green-600 font-medium">-0 ₽</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Доставка</span>
                  <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                    Бесплатно
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="text-gray-900 font-bold text-lg">Итого</span>
                  <span className="text-3xl font-extrabold text-gray-900">
                    {formatPrice(total)} ₽
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => (window.location.href = '/checkout')}
                rightIcon={<AiOutlineArrowRight size={20} />}
              >
                Перейти к оформлению
              </Button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                <AiOutlineSafety size={16} className="text-green-500" />
                <span>Безопасная оплата картой</span>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
});

CartItemsList.displayName = 'CartItemsList';

export default CartItemsList;

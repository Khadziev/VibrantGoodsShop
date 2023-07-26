import React from 'react';
import { useRemoveFromCartMutation } from '../../redux/api/apiCart';
import { useAppSelector } from '../../redux/store';
import { CartItem } from '../../redux/types/types';


interface CartItemsListProps {
  cartItems: CartItem[];
}

const CartItemsList: React.FC<CartItemsListProps> = ({ cartItems }) => {
  const [removeFromCart, { isLoading: isRemoving }] = useRemoveFromCartMutation();
  const userId = useAppSelector((state) => state.auth.userId);

  const handleRemoveFromCart = (productId: string) => {
    if (!userId) {
      console.error('userId не определен');
      return;
    }

    removeFromCart({ userId, productId })
      .unwrap()
      // .then((response) => {
      //   console.log('Товар успешно удален из корзины:', response);
      // })
      .catch((error) => {
        console.error('Произошла ошибка при удалении из корзины:', error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2>Список товаров в корзине:</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} className="flex flex-wrap gap-4 my-2 justify-center items-center">
            <img src={item.imageURL} alt="" className="w-60 h-60 object-cover rounded" />
            <div className="w-full flex m-3 text-sm justify-center items-center">
              <p className="mr-12">Цена: {item.price}$</p>
              <button onClick={() => handleRemoveFromCart(item.productId)} disabled={isRemoving} className="px-2 py-1 bg-red-600 text-white rounded">
                {isRemoving ? 'Удаление...' : 'Удалить'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartItemsList;
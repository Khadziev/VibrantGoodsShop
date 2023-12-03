import React from "react";
import { useRemoveFromCartMutation } from "@/apiServices/api/apiCart";
import { useAppSelector } from "@/app/providers/store";
import { NavLink } from "react-router-dom";
import BackButton from "@/UI/BackButton/BackButton";
import { CartItem } from "@/components/Basket/model/model";


interface CartItemsListProps {
  cartItems: CartItem[];
}

const CartItemsList: React.FC<CartItemsListProps> = ({ cartItems }) => {
  const [removeFromCart, { isLoading: isRemoving }] = useRemoveFromCartMutation();
  const userId = useAppSelector((state) => state.auth.userId);

  const handleRemoveFromCart = (productId: string) => {
    if (!userId) {
      console.error("userId не определен");
      return;
    }

    removeFromCart({ userId, productId })
      .unwrap()
      .catch((error) => {
        console.error("Произошла ошибка при удалении из корзины:", error);
      });
  };

  return (
    <div className="flex flex-col">
      <BackButton />
      <h2 className="text-customColorTextBase">Список товаров в корзине:</h2>

      <ul className="flex flex-row justify-start items-start flex-wrap gap-4">
        {cartItems.map((item, index) => (
          <li key={index} className="my-2">
            <NavLink to={`/data/${item.productId}`}>
              <img src={item.imageURL} alt="" className="w-60 h-60 object-cover rounded" />
            </NavLink>
            <div className="w-full flex m-3 text-sm">
              <p className="mr-12 text-customColorPrimary">Цена: {item.price}$</p>
              <button
                onClick={() => handleRemoveFromCart(item.productId)}
                disabled={isRemoving}
                className="px-2 py-1 bg-red-600 text-white rounded"
              >
                {isRemoving ? "Удаление..." : "Удалить"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartItemsList;

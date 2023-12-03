import React, { useEffect } from "react";
import { useGetCartByUserIdQuery } from "@/apiServices/api/apiCart";
import { useAppSelector } from "@/app/providers/store";
import CartItemsList from "./CartItemsList";
import Loading2 from "@/UI/Loading/Loading2";

const CartComponent: React.FC = () => {
  const userId = useAppSelector((state) => state.auth.userId);

  const { data: cart, isLoading, isError } = useGetCartByUserIdQuery(userId);

  useEffect(() => {
    // DataAttributesApi[]
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading2 />
      </div>
    );
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen">Ошибка при получении данных корзины.</div>;
  }

  if (!cart || cart.items.length === 0) {
    return <div className="flex justify-center items-center h-screen text-customColorTextBase">Корзина пуста.</div>;
  }

  const cartItems = cart.items;

  return (
    <div className="flex justify-center items-center h-screen flex-wrap">
      <CartItemsList cartItems={cartItems} />
    </div>
  );
};

export default CartComponent;

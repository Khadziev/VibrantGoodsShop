import React, { useState, useEffect, useCallback, memo } from 'react';
import { useAddToCartMutation, useGetCartByUserIdQuery } from '@/entities/cart/api/apiCart';
import { useAppSelector } from '@/app/providers/store';
import { MdShoppingCart, MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
import { DataAttributesApi } from '@/entities/product/model/model';
import { Button } from '@/shared/ui';

interface AddToCartButtonProps {
  product: DataAttributesApi;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = memo(({ product }) => {
  const [addToCart, { isLoading, isError }] = useAddToCartMutation();
  const userId = useAppSelector((state) => state.auth.userId);
  const { data: cartData } = useGetCartByUserIdQuery(userId || '', { skip: !userId });
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    if (cartData) {
      setIsInCart(cartData.items.some((item) => item.productId === product._id));
    }
  }, [cartData, product._id]);

  const handleAddToCart = useCallback(() => {
    if (!userId) {
      toast.error('Вы должны быть авторизованы');
      return;
    }

    const cartItem = {
      userId,
      productId: product._id,
      price: product.price,
      imageURL: product.imageURL,
      name: product.name,
    };

    addToCart(cartItem)
      .unwrap()
      .then(() => {
        setIsInCart(true);
        toast.success(`"${product.name}" добавлен в корзину!`);
      })
      .catch((error) => {
        console.error('Ошибка при добавлении в корзину:', error);
        toast.error('Не удалось добавить товар в корзину');
      });
  }, [userId, product, addToCart]);

  useEffect(() => {
    if (isError) {
      toast.error('Ошибка при добавлении в корзину');
    }
  }, [isError]);

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isLoading || isInCart}
      variant={isInCart ? 'success' : 'primary'}
      size="md"
      isLoading={isLoading}
      leftIcon={isInCart ? <MdCheckCircle size={20} /> : <MdShoppingCart size={20} />}
      className="rounded-full"
    >
      {isInCart ? 'В корзине' : 'В корзину'}
    </Button>
  );
});

AddToCartButton.displayName = 'AddToCartButton';

export default AddToCartButton;

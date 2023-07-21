import { Request, Response } from 'express';
import Cart, { CartAttributes, CartItem, CartDocument } from '../model/Cart.model';

const addToCart = async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart: CartDocument | null = await Cart.findOne({ userId });

    if (!cart) {
      const cartData: CartAttributes = {
        userId,
        items: [{ productId, quantity }],
      };
      cart = await Cart.create(cartData);
    } else {
      const item: CartItem = { productId, quantity };
      cart.items.push(item);
      await cart.save();
    }

    res.json({ message: 'Товар успешно добавлен в корзину', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Произошла ошибка' });
  }
};

const getCartByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const cart: CartDocument | null = await Cart.findOne({ userId });
    if (!cart) {
      res.status(404).json({ error: 'Корзина не найдена' });
    } else {
      res.json(cart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Произошла ошибка' });
  }
};

const deleteFromCart = async (req: Request, res: Response) => {
  const { userId, productId } = req.params;

  try {
    const cart: CartDocument | null = await Cart.findOne({ userId });
    if (!cart) {
      res.status(404).json({ error: 'Корзина не найдена' });
    } else {
      cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
      await cart.save();
      res.json({ message: 'Товар успешно удален из корзины', cart });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Произошла ошибка' });
  }
};

export { addToCart, getCartByUserId, deleteFromCart };

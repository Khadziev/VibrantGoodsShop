import express from 'express';
import { addToCart, getCartByUserId, deleteFromCart } from '../controllers/cart.controller';

const router = express.Router();

router.post('/cart', addToCart);
router.get('/cart/:userId', getCartByUserId);
router.delete('/cart/:userId/:productId', deleteFromCart);

export default router;

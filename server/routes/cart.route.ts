import express from 'express';
import { addToCart, getCartByUserId, deleteFromCart } from '../controllers/cart.controller';
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware';

const router = express.Router();

router.post('/cart', verifyTokenMiddleware, addToCart);
router.get('/cart/:userId', verifyTokenMiddleware, getCartByUserId);
router.delete('/cart/:userId/:productId',verifyTokenMiddleware, deleteFromCart);

export default router;

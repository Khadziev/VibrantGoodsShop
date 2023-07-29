import { createReview, getReviews } from '../controllers/reviewController';
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware';
import express from 'express';
const router = express.Router();

router.get('/data/:productId/reviews', getReviews);
router.post('/data/:productId/reviews', verifyTokenMiddleware, createReview);


export default router;

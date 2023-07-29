import { Request, Response } from 'express';
import Data from '../model/Data.model';
import Review, { ReviewAttributes } from '../model/Review.model';
import { Document, Types } from 'mongoose';
import User from '../model/User.model';

interface UserRequest extends Request {
    user?: {
      _id: string;
    };
  }
  
  interface ReviewResponse extends ReviewAttributes {
    _id: Types.ObjectId;
    userName: string;
  }
  
  export const getReviews = async (req: Request, res: Response): Promise<void> => {
    try {
      const { productId } = req.params;
  
      const reviews = await Review.find({ productId });
  
      const reviewData: ReviewResponse[] = await Promise.all(
        reviews.map(async (review) => {
          const user = await User.findById(review.userId);
          return {
            ...review.toObject(),
            userName: user?.name || "",
          };
        })
      );
  
      res.status(200).json(reviewData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        res.status(500).json({ error: error.toString() });
      } else {
        res.status(500).json({ error: 'Произошла неизвестная ошибка.' });
      }
    }
  };
  

export const createReview = async (req: UserRequest, res: Response): Promise<void> => {
    try {
      const { productId } = req.params;
      const { rating, text } = req.body;
      const userId = req.user?._id;

      const review: Document & ReviewAttributes = new Review({
        userId,
        productId,
        rating,
        text,
      });
      await review.save();
  
     
      const reviews = await Review.find({ productId });
      const newRating =
        reviews.reduce((sum, review) => sum + (review as any).rating, 0) / reviews.length;
      await Data.updateOne({ _id: productId }, { rating: newRating });
  
      res.status(201).json(review);
    } catch (error: unknown) {
      if (error instanceof Error) {
          console.error(error); 
          res.status(500).json({ error: error.toString() });
      } else {
          res.status(500).json({ error: 'Произошла неизвестная ошибка.' });
      }
    }
  };
  

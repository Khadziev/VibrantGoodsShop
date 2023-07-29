import mongoose, { Schema, Document, Model } from "mongoose";

export interface ReviewAttributes {
    userId: Schema.Types.ObjectId;
    productId: Schema.Types.ObjectId;
    rating: number;
    text: string;
  }
  
  interface ReviewDocument extends Document, ReviewAttributes {}
  
  const reviewSchema: Schema<ReviewDocument> = new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Data',
        required: true,
      },
      rating: {
        type: Number,
        required: false,
      },
      text: {
        type: String,
        required: false,
      },
    },
    { timestamps: true }
  );
  
  const Review: Model<ReviewDocument> = mongoose.model<ReviewDocument>('Review', reviewSchema);
  
  export default Review;
  
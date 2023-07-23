import mongoose, { Document, Model, Schema } from 'mongoose';

export interface CartItem {
  productId: mongoose.Types.ObjectId;
  imageURL: string;
  price: number;
  
}

export interface CartAttributes {
  userId: mongoose.Types.ObjectId;
  items: CartItem[];
}

export interface CartDocument extends Document, CartAttributes {}

const cartItemSchema = new Schema<CartItem>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Data',
    required: true,
  },
  imageURL: {     
    type: String,
  },
  price: {       
    type: Number,
  },
});


const cartSchema: Schema<CartDocument> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

const Cart: Model<CartDocument> = mongoose.model<CartDocument>('Cart', cartSchema);

export default Cart;

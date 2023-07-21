import mongoose, { Document, Model, Schema } from 'mongoose';

export interface CartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
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
  quantity: {
    type: Number,
    required: true,
    default: 1,
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

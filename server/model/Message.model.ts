import mongoose, { Document, Model, Schema } from 'mongoose';

interface IBroadcastMessage {
  body: string;
  image: string; 
}

interface BroadcastMessageDocument extends Document, IBroadcastMessage {}

const broadcastMessageSchema: Schema<BroadcastMessageDocument> = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String, 
      required: false, 
    },
  },
  { timestamps: true }
);

const BroadcastMessage: Model<BroadcastMessageDocument> = mongoose.model<BroadcastMessageDocument>('BroadcastMessage', broadcastMessageSchema);

export default BroadcastMessage;

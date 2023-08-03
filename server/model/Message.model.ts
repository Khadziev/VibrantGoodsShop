import mongoose, { Document, Model, Schema } from 'mongoose';

interface IBroadcastMessage {
  //from: string;
  body: string;
}

interface BroadcastMessageDocument extends Document, IBroadcastMessage {}

const broadcastMessageSchema: Schema<BroadcastMessageDocument> = new Schema(
  {
    // from: {
    //   type: String,
    //   required: true,
    // },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BroadcastMessage: Model<BroadcastMessageDocument> = mongoose.model<BroadcastMessageDocument>('BroadcastMessage', broadcastMessageSchema);

export default BroadcastMessage;

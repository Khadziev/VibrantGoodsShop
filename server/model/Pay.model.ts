import mongoose, { Document, Schema } from 'mongoose';

export interface IPay extends Document {
  amount: number;
  description: string;
  street: string;
  houseNumber: string;
  apartmentNumber: string;
  city: string;
  zip: string;
}

const PaySchema: Schema = new Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  street: { type: String, required: true },
  houseNumber: { type: String, required: true },
  apartmentNumber: { type: String, required: false },
  city: { type: String, required: true },
  zip: { type: String, required: true },
});

export default mongoose.model<IPay>('Pay', PaySchema);

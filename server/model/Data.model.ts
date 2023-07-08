import mongoose, { Document, Model, Schema } from 'mongoose';

export interface DataAttributes {
  title: string;
}

interface DataDocument extends Document, DataAttributes {}

const dataSchema: Schema<DataDocument> = new Schema({
  title: {
    type: String,
    required: true,
  },
});

const Data: Model<DataDocument> = mongoose.model<DataDocument>('Data', dataSchema);

export default Data;

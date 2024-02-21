import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name?: string;
  title?: string;
  description?: string;
  styles?: {
    backgroundColor?: string;
    flexDirection?: string;
    paddingBlock?: string;
    paddingInline?: string;
    gridRow?: string;
    gridColumn?: string;
  };
  href?: string;
  imgSrc?: string;
  imgWidth?: number;
  imgHeight?: number;
}

const categorySchema: Schema = new mongoose.Schema({
  name: { type: String },
  title: { type: String },
  description: { type: String },
  styles: {
    backgroundColor: { type: String },
    flexDirection: { type: String },
    paddingBlock: { type: String },
    paddingInline: { type: String },
    gridRow: { type: String },
    gridColumn: { type: String },
  },
  href: { type: String },
  imgSrc: { type: String },
  imgWidth: { type: Number },
  imgHeight: { type: Number },
});

export default mongoose.model<ICategory>("Category", categorySchema);


import mongoose, { Document, Model, Schema } from "mongoose";


export interface IBrand extends Document {
    name: string,
    imgSrc: string,
   
}

const brandSchema: Schema = new mongoose.Schema({
    name: {type: String},
    imgSrc: {type: String},
   
})

const Brand: Model<IBrand> = mongoose.model<IBrand>('Brand', brandSchema);

export default Brand;



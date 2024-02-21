import mongoose, { Document, Model, Schema } from "mongoose";


export interface ISlider extends Document {
    title: string,
    description: string,
    bgImg: string,
    url: string,
}

const sliderSchema: Schema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    bgImg: {type: String},
    url: {type: String}
})

const Slider: Model<ISlider> = mongoose.model<ISlider>('Slider', sliderSchema);

export default Slider;
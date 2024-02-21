"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sliderSchema = new mongoose_1.default.Schema({
    title: { type: String },
    description: { type: String },
    bgImg: { type: String },
    url: { type: String }
});
const Slider = mongoose_1.default.model('Data', sliderSchema);
exports.default = Slider;

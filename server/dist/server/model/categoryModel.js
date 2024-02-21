"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model("Category", categorySchema);

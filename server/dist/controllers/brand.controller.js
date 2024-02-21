"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBrand = void 0;
const Brand_model_1 = __importDefault(require("../model/Brand.model"));
const getAllBrand = (req, res) => {
    Brand_model_1.default.find()
        .then((data) => {
        res.json(data);
    })
        .catch((error) => {
        res.status(500).json({ error: 'непредвиденная ошибка' });
    });
};
exports.getAllBrand = getAllBrand;

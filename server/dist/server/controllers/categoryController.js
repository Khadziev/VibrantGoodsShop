"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.addCategory = exports.getAllCategories = void 0;
const categoryModel_1 = __importDefault(require("../model/categoryModel"));
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categoryModel_1.default.find();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllCategories = getAllCategories;
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, title, description, imgSrc, } = req.body;
        const newCategory = new categoryModel_1.default({
            name,
            title,
            description,
            imgSrc,
        });
        const savedCategory = yield newCategory.save();
        res.status(201).json(savedCategory);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.addCategory = addCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
        const { name, title, description, styles, href, imgSrc, imgWidth, imgHeight } = req.body;
        const updatedCategory = yield categoryModel_1.default.findByIdAndUpdate(categoryId, {
            name,
            title,
            description,
            styles,
            href,
            imgSrc,
            imgWidth,
            imgHeight,
        }, { new: true });
        if (updatedCategory) {
            res.json(updatedCategory);
        }
        else {
            res.status(404).json({ message: "Category not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
        const deletedCategory = yield categoryModel_1.default.findByIdAndDelete(categoryId);
        if (deletedCategory) {
            res.json(deletedCategory);
        }
        else {
            res.status(404).json({ message: "Category not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteCategory = deleteCategory;

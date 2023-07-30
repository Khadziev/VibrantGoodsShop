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
exports.createReview = exports.getReviews = void 0;
const Data_model_1 = __importDefault(require("../model/Data.model"));
const Review_model_1 = __importDefault(require("../model/Review.model"));
const User_model_1 = __importDefault(require("../model/User.model"));
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const reviews = yield Review_model_1.default.find({ productId });
        const reviewData = yield Promise.all(reviews.map((review) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield User_model_1.default.findById(review.userId);
            return Object.assign(Object.assign({}, review.toObject()), { userName: (user === null || user === void 0 ? void 0 : user.name) || "" });
        })));
        res.status(200).json(reviewData);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error);
            res.status(500).json({ error: error.toString() });
        }
        else {
            res.status(500).json({ error: 'Произошла неизвестная ошибка.' });
        }
    }
});
exports.getReviews = getReviews;
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { productId } = req.params;
        const { rating, text } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const review = new Review_model_1.default({
            userId,
            productId,
            rating,
            text,
        });
        yield review.save();
        const reviews = yield Review_model_1.default.find({ productId });
        const newRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
        yield Data_model_1.default.updateOne({ _id: productId }, { rating: newRating });
        res.status(201).json(review);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error);
            res.status(500).json({ error: error.toString() });
        }
        else {
            res.status(500).json({ error: 'Произошла неизвестная ошибка.' });
        }
    }
});
exports.createReview = createReview;

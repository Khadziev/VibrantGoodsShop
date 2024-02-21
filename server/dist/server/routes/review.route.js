"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reviewController_1 = require("../controllers/reviewController");
const verifyTokenMiddleware_1 = require("../middlewares/verifyTokenMiddleware");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/data/:productId/reviews', reviewController_1.getReviews);
router.post('/data/:productId/reviews', verifyTokenMiddleware_1.verifyTokenMiddleware, reviewController_1.createReview);
exports.default = router;

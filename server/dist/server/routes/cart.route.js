"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../controllers/cart.controller");
const verifyTokenMiddleware_1 = require("../middlewares/verifyTokenMiddleware");
const router = express_1.default.Router();
router.post('/cart', verifyTokenMiddleware_1.verifyTokenMiddleware, cart_controller_1.addToCart);
router.get('/cart/:userId', verifyTokenMiddleware_1.verifyTokenMiddleware, cart_controller_1.getCartByUserId);
router.delete('/cart/:userId/:productId', verifyTokenMiddleware_1.verifyTokenMiddleware, cart_controller_1.deleteFromCart);
exports.default = router;

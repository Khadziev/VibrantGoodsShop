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
exports.deleteFromCart = exports.getCartByUserId = exports.addToCart = void 0;
const Cart_model_1 = __importDefault(require("../model/Cart.model"));
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, price } = req.body;
    let { imageURL } = req.body;
    if (Array.isArray(imageURL)) {
        imageURL = imageURL[0];
    }
    try {
        let cart = yield Cart_model_1.default.findOne({ userId });
        if (!cart) {
            const cartData = {
                userId,
                items: [{ productId, imageURL, price }],
            };
            cart = yield Cart_model_1.default.create(cartData);
        }
        else {
            const item = { productId, imageURL, price };
            cart.items.push(item);
            yield cart.save();
        }
        res.json({ message: 'Товар успешно добавлен в корзину', cart });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Произошла ошибка' });
    }
});
exports.addToCart = addToCart;
const getCartByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const cart = yield Cart_model_1.default.findOne({ userId });
        if (!cart) {
            res.status(404).json({ error: 'Корзина не найдена' });
        }
        else {
            res.json(cart);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Произошла ошибка' });
    }
});
exports.getCartByUserId = getCartByUserId;
const deleteFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId } = req.params;
    try {
        const cart = yield Cart_model_1.default.findOne({ userId });
        if (!cart) {
            res.status(404).json({ error: 'Корзина не найдена' });
        }
        else {
            cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
            yield cart.save();
            res.json({ message: 'Товар успешно удален из корзины', cart });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Произошла ошибка' });
    }
});
exports.deleteFromCart = deleteFromCart;

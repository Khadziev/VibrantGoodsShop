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
exports.verifyTokenMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = __importDefault(require("../model/User.model"));
const verifyTokenMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return res.status(401).json({ message: 'Токен не предоставлен' });
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer')
            return res.status(401).json({ message: 'Неверный формат токена' });
        const token = parts[1];
        const secret = process.env.SECRET_JWT_KEY;
        if (!secret)
            return res.status(500).json({ message: 'Не настроен SECRET_JWT_KEY' });
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (!(decoded === null || decoded === void 0 ? void 0 : decoded.id))
            return res.status(401).json({ message: 'Неверный токен' });
        const user = yield User_model_1.default.findById(decoded.id).select('-password');
        if (!user)
            return res.status(401).json({ message: 'Пользователь не найден' });
        req.userId = decoded.id;
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Ошибка аутентификации', detail: err === null || err === void 0 ? void 0 : err.message });
    }
});
exports.verifyTokenMiddleware = verifyTokenMiddleware;

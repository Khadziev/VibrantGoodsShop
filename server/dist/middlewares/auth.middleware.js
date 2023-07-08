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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json('Нет доступа (no authorization header)');
        }
        const [type, token] = authorization.split(' ');
        if (type !== 'Bearer') {
            return res.status(401).json('Неверный тип токена');
        }
        const secretKey = process.env.SECRET_JWT_KEY;
        if (!secretKey) {
            return res.status(500).json({ error: 'Отсутствует ключ для JWT' });
        }
        req.user = jsonwebtoken_1.default.verify(token, secretKey);
        next();
    }
    catch (error) {
        return res.status(401).json('Ошибка авторизации: ' + error.toString());
    }
});
exports.default = authenticateToken;

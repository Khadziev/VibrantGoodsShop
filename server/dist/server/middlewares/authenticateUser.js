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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = __importDefault(require("../model/User.model"));
const authenticateUser = (login, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_model_1.default.findOne({ login });
        if (!user) {
            throw new Error('Неверный логин');
        }
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Неверный пароль');
        }
        const payload = {
            //   id: user._id,
            login: user.login,
            role: user.role,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_JWT_KEY);
        return token;
    }
    catch (error) {
        throw new Error('Ошибка аутентификации: ' + error.message);
    }
});

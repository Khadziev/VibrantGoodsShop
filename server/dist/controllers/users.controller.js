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
exports.usersController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = __importDefault(require("../model/User.model"));
const createToken = (userId, login) => {
    const payload = {
        id: userId,
        login: login,
    };
    const secretKey = process.env.SECRET_JWT_KEY;
    if (!secretKey) {
        throw new Error('Отсутствует ключ для JWT');
    }
    const token = jsonwebtoken_1.default.sign(payload, secretKey, {
        expiresIn: '24h',
    });
    return token;
};
exports.usersController = {
    getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield User_model_1.default.find();
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ error: 'Ошибка при получении пользователей' });
        }
    }),
    registerUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { login, password, name } = req.body;
            const saltRounds = Number(process.env.BCRYPT_ROUNDS);
            const hash = yield bcrypt_1.default.hash(password, saltRounds);
            const user = yield User_model_1.default.create({
                login: login,
                password: hash,
                name: name,
                role: "user",
            });
            res.json(user);
        }
        catch (error) {
            res.status(400).json({ error: 'Ошибка при регистрации: ' + error.toString() });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { login, password } = req.body;
            const candidate = yield User_model_1.default.findOne({ login });
            if (!candidate) {
                return res.status(401).json('Неверный логин');
            }
            const valid = yield bcrypt_1.default.compare(password, candidate.password);
            if (!valid) {
                return res.status(401).json('Неверный пароль');
            }
            const token = createToken(candidate._id, candidate.login);
            res.json({ token, name: candidate.name, role: candidate.role, userId: candidate._id });
        }
        catch (error) {
            res.status(500).json({ error: 'Ошибка при входе: ' + error.toString() });
        }
    }),
};

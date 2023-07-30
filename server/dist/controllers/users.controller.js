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
    getUserById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const user = yield User_model_1.default.findById(id);
            if (!user) {
                return res.status(404).json({ error: 'Пользователь не найден' });
            }
            const userResponse = Object.assign(Object.assign({}, user.toObject()), { password: undefined });
            res.json(userResponse);
        }
        catch (error) {
            res.status(500).json({ error: 'Ошибка при получении пользователя' });
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
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.id;
        const dataToUpdate = req.body;
        try {
            const user = yield User_model_1.default.findByIdAndUpdate(userId, dataToUpdate, { new: true }); // new: true returns the updated user
            if (user) {
                res.json(user);
            }
            else {
                res.status(404).send('User not found');
            }
        }
        catch (error) {
            console.log("Error while updating user: ", error); // added console.log
            res.status(500).json({ error: 'An error occurred while updating the user: ' + error.toString() });
        }
    }),
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.id;
        try {
            const user = yield User_model_1.default.findByIdAndDelete(userId);
            if (user) {
                res.json({ message: 'User deleted successfully' });
            }
            else {
                res.status(404).send('User not found');
            }
        }
        catch (error) {
            console.log("Error while deleting user: ", error); // added console.log
            res.status(500).json({ error: 'An error occurred while deleting the user: ' + error.toString() });
        }
    }),
};

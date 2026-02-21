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
const google_auth_library_1 = require("google-auth-library");
const crypto_1 = __importDefault(require("crypto"));
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
            if (!login || !password)
                return res.status(400).json({ error: 'login и password обязательны' });
            const saltRounds = Number(process.env.BCRYPT_ROUNDS) || 10;
            const hash = yield bcrypt_1.default.hash(password, saltRounds);
            // don't allow client to set role
            const user = yield User_model_1.default.create({
                login: login,
                password: hash,
                name: name,
                role: 'user',
            });
            const userObj = user.toObject();
            delete userObj.password;
            res.json(userObj);
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
            const token = createToken(candidate._id.toString(), candidate.login);
            res.json({ token, name: candidate.name, role: candidate.role, userId: candidate._id.toString() });
        }
        catch (error) {
            res.status(500).json({ error: 'Ошибка при входе: ' + error.toString() });
        }
    }),
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.id;
        const dataToUpdate = req.body;
        try {
            const requesterId = req.userId;
            const requester = req.user;
            if (requesterId !== userId && (requester === null || requester === void 0 ? void 0 : requester.role) !== 'admin') {
                return res.status(403).json({ message: 'Нет прав на изменение пользователя' });
            }
            // prevent updating protected fields
            delete dataToUpdate.role;
            delete dataToUpdate.password;
            const user = yield User_model_1.default.findByIdAndUpdate(userId, dataToUpdate, { new: true }).select('-password');
            if (user) {
                res.json(user);
            }
            else {
                res.status(404).send('Пользователь не найден');
            }
        }
        catch (error) {
            console.log("Ошибка при обновлении пользователя: ", error);
            res.status(500).json({ error: 'Произошла ошибка при обновлении пользователя: ' + error.toString() });
        }
    }),
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.id;
        try {
            const requesterId = req.userId;
            const requester = req.user;
            if (requesterId !== userId && (requester === null || requester === void 0 ? void 0 : requester.role) !== 'admin') {
                return res.status(403).json({ message: 'Нет прав на удаление пользователя' });
            }
            const user = yield User_model_1.default.findByIdAndDelete(userId);
            if (user) {
                res.json({ message: 'Пользователь успешно удален' });
            }
            else {
                res.status(404).send('Пользователь не найден');
            }
        }
        catch (error) {
            console.log("Ошибка при удалении пользователя: ", error);
            res.status(500).json({ error: 'Произошла ошибка при удалении пользователя: ' + error.toString() });
        }
    }),
    // Google OAuth redirect endpoint: redirects user to Google's consent screen
    googleAuthRedirect: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const clientId = process.env.GOOGLE_CLIENT_ID;
            const redirectUri = `${process.env.SERVER_URL || `http://localhost:${process.env.PORT || 5000}`}/api/auth/google/callback`;
            if (!clientId)
                return res.status(500).json({ message: 'GOOGLE_CLIENT_ID not configured' });
            const params = new URLSearchParams({
                client_id: clientId,
                redirect_uri: redirectUri,
                response_type: 'code',
                scope: 'openid email profile',
                access_type: 'offline',
                prompt: 'consent',
            });
            const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
            res.redirect(url);
        }
        catch (err) {
            console.error('Google redirect error', err);
            res.status(500).json({ message: 'Ошибка перенаправления на Google' });
        }
    }),
    // Google OAuth callback: exchange code, verify id_token, create/find user and return JWT via redirect
    googleAuthCallback: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const code = req.query.code;
            if (!code)
                return res.status(400).json({ message: 'Code not provided' });
            const clientId = process.env.GOOGLE_CLIENT_ID;
            const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
            const redirectUri = `${process.env.SERVER_URL || `http://localhost:${process.env.PORT || 5000}`}/api/auth/google/callback`;
            if (!clientId || !clientSecret)
                return res.status(500).json({ message: 'Google OAuth not configured' });
            const client = new google_auth_library_1.OAuth2Client(clientId, clientSecret, redirectUri);
            const tokenResponse = yield client.getToken(code);
            const tokens = tokenResponse.tokens;
            const idToken = tokens.id_token;
            if (!idToken)
                return res.status(400).json({ message: 'No id_token returned from Google' });
            const ticket = yield client.verifyIdToken({ idToken, audience: clientId });
            const payload = ticket.getPayload();
            const email = payload === null || payload === void 0 ? void 0 : payload.email;
            const name = (payload === null || payload === void 0 ? void 0 : payload.name) || 'Google User';
            if (!email)
                return res.status(400).json({ message: 'Google account has no email' });
            let user = yield User_model_1.default.findOne({ login: email });
            if (!user) {
                const saltRounds = Number(process.env.BCRYPT_ROUNDS) || 10;
                const randomPass = crypto_1.default.randomBytes(16).toString('hex');
                const hash = yield bcrypt_1.default.hash(randomPass, saltRounds);
                user = yield User_model_1.default.create({ login: email, name: name, password: hash, role: 'user' });
            }
            const token = createToken(user._id.toString(), user.login);
            const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
            const redirectTo = `${clientUrl}/login?token=${encodeURIComponent(token)}&userId=${user._id.toString()}&name=${encodeURIComponent(user.name)}&role=${encodeURIComponent(user.role)}`;
            res.redirect(redirectTo);
        }
        catch (err) {
            console.error('Google callback error', err);
            res.status(500).json({ message: 'Ошибка Google callback', detail: err === null || err === void 0 ? void 0 : err.message });
        }
    }),
};

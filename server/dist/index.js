"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const data_route_1 = __importDefault(require("./routes/data.route"));
const cart_route_1 = __importDefault(require("./routes/cart.route"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const baseApiUrl = '/api';
app.use(baseApiUrl, users_route_1.default);
app.use(baseApiUrl, data_route_1.default);
app.use(baseApiUrl, cart_route_1.default);
app.use(express_1.default.static(path_1.default.resolve(process.cwd(), "client", "dist")));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(process.cwd(), "client", "dist", "index.html"));
});
mongoose_1.default
    .connect(process.env.MONGO, {})
    .then(() => {
    app.listen(process.env.PORT, () => console.log('Сервер запущен...'));
})
    .catch((error) => {
    console.error('Ошибка подключения к MongoDB:', error);
});

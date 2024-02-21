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
const fs_1 = __importDefault(require("fs"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const data_route_1 = __importDefault(require("./routes/data.route"));
const cart_route_1 = __importDefault(require("./routes/cart.route"));
const review_route_1 = __importDefault(require("./routes/review.route"));
const pay_routes_1 = __importDefault(require("./routes/pay.routes"));
const message_route_1 = __importDefault(require("./routes/message.route"));
const categoryRoutes_route_1 = __importDefault(require("./routes/categoryRoutes.route"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const baseApiUrl = '/api';
app.use(baseApiUrl, users_route_1.default);
app.use(baseApiUrl, data_route_1.default);
app.use(baseApiUrl, cart_route_1.default);
app.use(baseApiUrl, review_route_1.default);
app.use(baseApiUrl, pay_routes_1.default);
app.use(baseApiUrl, message_route_1.default);
app.use(baseApiUrl, categoryRoutes_route_1.default);
app.use('/uploads', express_1.default.static('uploads'));
const clientDistPath = path_1.default.resolve(__dirname, "..", "..", "client", "dist");
app.use(express_1.default.static(clientDistPath));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(clientDistPath, "index.html"));
});
fs_1.default.readdir(clientDistPath, (err, files) => {
    if (err) {
        console.error(`Ошибка при чтении директории ${clientDistPath}:`, err);
    }
    else {
        console.log(`Файлы в директории ${clientDistPath}:`, files);
    }
});
mongoose_1.default
    .connect(process.env.MONGO, {})
    .then(() => {
    app.listen(process.env.PORT, () => console.log('Сервер запущен...'));
})
    .catch((error) => {
    console.error('Ошибка подключения к MongoDB:', error);
});

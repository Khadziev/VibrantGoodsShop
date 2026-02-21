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
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const data_route_1 = __importDefault(require("./routes/data.route"));
const cart_route_1 = __importDefault(require("./routes/cart.route"));
const review_route_1 = __importDefault(require("./routes/review.route"));
const pay_routes_1 = __importDefault(require("./routes/pay.routes"));
const message_route_1 = __importDefault(require("./routes/message.route"));
const categoryRoutes_route_1 = __importDefault(require("./routes/categoryRoutes.route"));
const slider_route_1 = __importDefault(require("./routes/slider.route"));
const brand_route_1 = __importDefault(require("./routes/brand.route"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
const baseApiUrl = '/api';
app.use(baseApiUrl, users_route_1.default);
app.use(baseApiUrl, data_route_1.default);
app.use(baseApiUrl, cart_route_1.default);
app.use(baseApiUrl, review_route_1.default);
app.use(baseApiUrl, pay_routes_1.default);
app.use(baseApiUrl, message_route_1.default);
app.use(baseApiUrl, categoryRoutes_route_1.default);
app.use(baseApiUrl, slider_route_1.default);
app.use(baseApiUrl, brand_route_1.default);
app.use('/uploads', express_1.default.static('uploads'));
const clientDistPath = path_1.default.resolve(__dirname, '..', '..', 'client', 'dist');
if (fs_1.default.existsSync(clientDistPath)) {
    app.use(express_1.default.static(clientDistPath));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(clientDistPath, 'index.html'));
    });
}
else {
    console.log('Client dist not found — running API only');
}
mongoose_1.default
    .connect(process.env.MONGO, {})
    .then(() => {
    const port = Number(process.env.PORT) || 5000;
    app.listen(port, () => console.log(`Сервер запущен на порту ${port}...`));
})
    .catch((error) => {
    console.error('Ошибка подключения к MongoDB:', error);
});
// basic environment checks
const requiredEnv = ['MONGO', 'SECRET_JWT_KEY'];
for (const v of requiredEnv) {
    if (!process.env[v]) {
        console.warn(`Warning: env var ${v} is not set`);
    }
}
// centralized error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

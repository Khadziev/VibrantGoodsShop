"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnlyMiddleware = void 0;
const User_model_1 = require("../model/User.model");
const adminOnlyMiddleware = (req, res, next) => {
    var _a;
    console.log('User:', req.user);
    console.log('Role:', (_a = req.user) === null || _a === void 0 ? void 0 : _a.role);
    if (!req.user || req.user.role !== User_model_1.UserRole.ADMIN) {
        console.log('Доступ запрещен');
        return res.status(403).json({ message: 'Доступ запрещен' });
    }
    next();
};
exports.adminOnlyMiddleware = adminOnlyMiddleware;

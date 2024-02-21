"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyTokenMiddleware_1 = require("../middlewares/verifyTokenMiddleware");
const slider_controller_1 = require("../controllers/slider.controller");
const express_1 = __importDefault(require("express"));
const adminOnlyMiddleware_1 = require("../middlewares/adminOnlyMiddleware");
const multerConfig_1 = require("../multerConfig");
const router = express_1.default.Router();
router.get('/slider', verifyTokenMiddleware_1.verifyTokenMiddleware, slider_controller_1.getAllSlider);
router.post('/slider', verifyTokenMiddleware_1.verifyTokenMiddleware, adminOnlyMiddleware_1.adminOnlyMiddleware, multerConfig_1.upload.single('image'), slider_controller_1.addSlider);
router.patch('/slider/:id', verifyTokenMiddleware_1.verifyTokenMiddleware, adminOnlyMiddleware_1.adminOnlyMiddleware, slider_controller_1.updateSlider);
exports.default = router;

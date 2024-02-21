"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const brand_controller_1 = require("../controllers/brand.controller");
const verifyTokenMiddleware_1 = require("../middlewares/verifyTokenMiddleware");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/brand', verifyTokenMiddleware_1.verifyTokenMiddleware, brand_controller_1.getAllBrand);
exports.default = router;

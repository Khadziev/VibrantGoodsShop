"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyTokenMiddleware_1 = require("../middlewares/verifyTokenMiddleware");
const adminOnlyMiddleware_1 = require("../middlewares/adminOnlyMiddleware");
const express_1 = __importDefault(require("express"));
const data_controller_1 = require("../controllers/data.controller");
const router = express_1.default.Router();
router.get('/data', verifyTokenMiddleware_1.verifyTokenMiddleware, data_controller_1.getAllData);
router.post('/data', verifyTokenMiddleware_1.verifyTokenMiddleware, adminOnlyMiddleware_1.adminOnlyMiddleware, data_controller_1.addData);
router.delete('/data/:id', verifyTokenMiddleware_1.verifyTokenMiddleware, adminOnlyMiddleware_1.adminOnlyMiddleware, data_controller_1.deleteData);
router.put('/data/:id', verifyTokenMiddleware_1.verifyTokenMiddleware, adminOnlyMiddleware_1.adminOnlyMiddleware, data_controller_1.updateData);
exports.default = router;

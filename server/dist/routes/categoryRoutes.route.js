"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const verifyTokenMiddleware_1 = require("../middlewares/verifyTokenMiddleware");
const adminOnlyMiddleware_1 = require("../middlewares/adminOnlyMiddleware");
const router = express_1.default.Router();
router.get("/categories", categoryController_1.getAllCategories);
router.post("/categories", verifyTokenMiddleware_1.verifyTokenMiddleware, adminOnlyMiddleware_1.adminOnlyMiddleware, categoryController_1.addCategory);
router.put("/categories/:id", verifyTokenMiddleware_1.verifyTokenMiddleware, adminOnlyMiddleware_1.adminOnlyMiddleware);
router.delete("/categories/:id", verifyTokenMiddleware_1.verifyTokenMiddleware, adminOnlyMiddleware_1.adminOnlyMiddleware);
exports.default = router;

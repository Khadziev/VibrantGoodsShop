import express, { Router } from "express";
import { addCategory, getAllCategories } from "../controllers/categoryController";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";
import { adminOnlyMiddleware } from "../middlewares/adminOnlyMiddleware";

const router: Router = express.Router();

router.get("/categories", getAllCategories);
router.post("/categories", verifyTokenMiddleware, adminOnlyMiddleware, addCategory);
router.put("/categories/:id", verifyTokenMiddleware, adminOnlyMiddleware);
router.delete("/categories/:id", verifyTokenMiddleware, adminOnlyMiddleware);

export default router;

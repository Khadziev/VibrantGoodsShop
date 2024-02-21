import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";
import { addSlider, getAllSlider, updateSlider } from "../controllers/slider.controller";
import express, { Router } from "express";
import { adminOnlyMiddleware } from "../middlewares/adminOnlyMiddleware";
import { upload } from "../multerConfig";



const router: Router = express.Router()

router.get('/slider', verifyTokenMiddleware,getAllSlider )
router.post('/slider', verifyTokenMiddleware, adminOnlyMiddleware, upload.single('image'), addSlider)
router.patch('/slider/:id', verifyTokenMiddleware, adminOnlyMiddleware, updateSlider)

export default router
import { getAllBrand } from "../controllers/brand.controller";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";
import express, { Router } from "express";


const router: Router = express.Router()

router.get('/brand', verifyTokenMiddleware,getAllBrand )


export default router
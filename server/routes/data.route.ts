import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware';

import { adminOnlyMiddleware } from '../middlewares/adminOnlyMiddleware';
import express from 'express';
import { getAllData, addData } from '../controllers/data.controller';

const router = express.Router();

router.get('/data', verifyTokenMiddleware , getAllData);
router.post('/data', verifyTokenMiddleware, adminOnlyMiddleware, addData);

export default router;

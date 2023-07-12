import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware';
import { adminOnlyMiddleware } from '../middlewares/adminOnlyMiddleware';
import express from 'express';
import { getAllData, addData, deleteData, updateData, getDataById } from '../controllers/data.controller';

const router = express.Router();

router.get('/data', verifyTokenMiddleware, getAllData);
router.get('/data/:id', verifyTokenMiddleware, getDataById);
router.post('/data', verifyTokenMiddleware, adminOnlyMiddleware, addData);
router.delete('/data/:id', verifyTokenMiddleware, adminOnlyMiddleware, deleteData);
router.put('/data/:id', verifyTokenMiddleware, adminOnlyMiddleware, updateData);

export default router;

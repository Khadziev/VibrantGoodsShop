import express from 'express';
import * as payController from '../controllers/pay.controller';

const router = express.Router();


router.get('/payments', payController.getAllPayments);


router.post('/payments', payController.createPayment);

export default router;

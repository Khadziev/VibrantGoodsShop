import { Router } from 'express';
import { messageController } from '../controllers/messages.controller';
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware';
import { adminOnlyMiddleware } from '../middlewares/adminOnlyMiddleware';

const router = Router();

router.get('/messages', verifyTokenMiddleware, messageController.getAllMessages);

router.post('/broadcast', verifyTokenMiddleware, adminOnlyMiddleware, messageController.broadcastMessage);

export default router;

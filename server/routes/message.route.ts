import { Router } from 'express';
import { messageController } from '../controllers/messages.controller';
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware';
import { adminOnlyMiddleware } from '../middlewares/adminOnlyMiddleware';
import { upload } from '../multerConfig'; 

const router = Router();

router.get('/messages', verifyTokenMiddleware, messageController.getAllMessages);
router.post('/broadcast', verifyTokenMiddleware, adminOnlyMiddleware, upload.single('image'), messageController.broadcastMessage);

export default router;

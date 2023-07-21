import { Router } from 'express';
import { usersController } from '../controllers/users.controller';

const router = Router();

router.get('/users', usersController.getAllUsers);
router.post('/registration', usersController.registerUser);
router.post('/login', usersController.login);

export default router;
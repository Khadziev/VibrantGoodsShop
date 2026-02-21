import { Router } from "express";
import { usersController } from "../controllers/users.controller";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware";

const router = Router();

router.get("/users", verifyTokenMiddleware, usersController.getAllUsers);
router.get("/users/:id", verifyTokenMiddleware, usersController.getUserById);
router.get('/auth/google', usersController.googleAuthRedirect);
router.get('/auth/google/callback', usersController.googleAuthCallback);
router.post("/registration", usersController.registerUser);
router.post("/login", usersController.login);
router.put("/users/:id", verifyTokenMiddleware, usersController.updateUser);
router.delete("/users/:id", verifyTokenMiddleware, usersController.deleteUser);

export default router;

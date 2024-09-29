import express from 'express';
import { AuthController } from './controller/auth';
import { TaskController } from './controller/task';
import { jwtMiddleware, authMiddleware } from './middleware/auth';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/users', jwtMiddleware, authMiddleware('USER'), AuthController.getUsers);

router.get('/tasks', jwtMiddleware, authMiddleware('USER', 'ADMIN'), TaskController.getAllTasks);
router.get('/tasks/:id', jwtMiddleware, authMiddleware('USER', 'ADMIN'), TaskController.getTaskById);
router.post('/tasks', jwtMiddleware, authMiddleware('USER', 'ADMIN'), TaskController.createTask);
router.put('/tasks/:id', jwtMiddleware, authMiddleware('USER', 'ADMIN'), TaskController.updateTask);
router.delete('/tasks/:id', jwtMiddleware, authMiddleware('ADMIN'), TaskController.deleteTask);

export default router;

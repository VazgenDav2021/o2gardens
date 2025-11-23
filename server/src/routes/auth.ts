import express from 'express';
import { login, register, getMe, logout } from '../controllers/authController';
import { protect, authorize } from '../middleware/auth';
import { validate } from '../middleware/validator';
import { loginValidator, registerValidator } from '../validators/authValidator';

const router = express.Router();

router.post('/login', validate(loginValidator), login);
router.post('/register', protect, authorize('admin'), validate(registerValidator), register);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

export default router;


import express from 'express';
import {
  loginAdmin,
  getAdminProfile,
  updateAdminPassword,
  registerUser,
  loginUser,
  getUserProfile
} from '../controllers/authController.js';
import { protectAdmin, protectUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin auth
router.post('/login', loginAdmin);
router.get('/me', protectAdmin, getAdminProfile);
router.put('/password', protectAdmin, updateAdminPassword);

// User auth
router.post('/register', registerUser);
router.post('/user-login', loginUser);
router.get('/user-me', protectUser, getUserProfile);

export default router;

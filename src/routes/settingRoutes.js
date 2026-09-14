import express from 'express';
import {
  getSettings,
  updateSettings
} from '../controllers/settingController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route
router.get('/', getSettings);

// Admin route
router.put('/', protectAdmin, updateSettings);

export default router;

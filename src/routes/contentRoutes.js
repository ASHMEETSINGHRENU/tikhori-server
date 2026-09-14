import express from 'express';
import {
  getAllContent,
  getContentBySection,
  updateSectionContent
} from '../controllers/contentController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllContent);
router.get('/:section', getContentBySection);

// Admin route
router.put('/:section', protectAdmin, updateSectionContent);

export default router;

import express from 'express';
import {
  getActiveBanners,
  getAllBannersAdmin,
  createBanner,
  updateBanner,
  deleteBanner
} from '../controllers/bannerController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../config/multer.js';

const router = express.Router();

// Public route
router.get('/', getActiveBanners);

// Admin routes
router.get('/admin/all', protectAdmin, getAllBannersAdmin);
router.post('/admin', protectAdmin, upload.single('imageFile'), createBanner);
router.put('/admin/:id', protectAdmin, upload.single('imageFile'), updateBanner);
router.delete('/admin/:id', protectAdmin, deleteBanner);

export default router;

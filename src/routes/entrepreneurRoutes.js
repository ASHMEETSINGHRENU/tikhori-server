import express from 'express';
import {
  getPublicEntrepreneurs,
  getAllEntrepreneursAdmin,
  createEntrepreneur,
  updateEntrepreneur,
  deleteEntrepreneur
} from '../controllers/entrepreneurController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../config/multer.js';

const router = express.Router();

// Public route
router.get('/', getPublicEntrepreneurs);

// Admin routes
router.get('/admin/all', protectAdmin, getAllEntrepreneursAdmin);
router.post('/admin', protectAdmin, upload.single('photoFile'), createEntrepreneur);
router.put('/admin/:id', protectAdmin, upload.single('photoFile'), updateEntrepreneur);
router.delete('/admin/:id', protectAdmin, deleteEntrepreneur);

export default router;

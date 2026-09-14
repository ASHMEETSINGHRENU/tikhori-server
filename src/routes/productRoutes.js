import express from 'express';
import {
  getPublicProducts,
  getProductBySlug,
  getAllProductsAdmin,
  getProductByIdAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus
} from '../controllers/productController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../config/multer.js';

const router = express.Router();

// Public routes
router.get('/', getPublicProducts);
router.get('/slug/:slug', getProductBySlug);

// Admin routes
router.get('/admin/all', protectAdmin, getAllProductsAdmin);
router.get('/admin/:id', protectAdmin, getProductByIdAdmin);
router.post('/admin', protectAdmin, upload.single('imageFile'), createProduct);
router.put('/admin/:id', protectAdmin, upload.single('imageFile'), updateProduct);
router.delete('/admin/:id', protectAdmin, deleteProduct);
router.patch('/admin/:id/toggle', protectAdmin, toggleProductStatus);

export default router;

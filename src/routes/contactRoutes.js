import express from 'express';
import {
  submitContactEnquiry,
  getAllEnquiriesAdmin,
  updateEnquiryStatus,
  deleteEnquiry
} from '../controllers/contactController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route
router.post('/', submitContactEnquiry);

// Admin routes
router.get('/admin/all', protectAdmin, getAllEnquiriesAdmin);
router.put('/admin/:id/status', protectAdmin, updateEnquiryStatus);
router.delete('/admin/:id', protectAdmin, deleteEnquiry);

export default router;

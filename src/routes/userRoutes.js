import express from 'express';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protectAdmin);

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;

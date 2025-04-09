import express from 'express';
import { adminLogin } from '../controllers/adminController.js';
import { getUsers } from '../controllers/userController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.post('/admin/login', adminLogin);
router.get('/users', protect, getUsers);

export default router;
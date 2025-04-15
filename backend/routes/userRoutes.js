import express from 'express';
import {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', protect, getUsers);
router.put('/:id', updateUser);       //  fix
router.delete('/:id', deleteUser);    //  fix

export default router;
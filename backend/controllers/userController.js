import User from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Assuming you already have a User model
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
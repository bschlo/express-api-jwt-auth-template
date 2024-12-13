// controllers/profiles.js
import express from 'express'
const router = express.Router();
import User from '../models/user.js'
import verifyToken from '../middleware/verify-token.js';


router.get('/:userId', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404);
      throw new Error('Profile not found.');
    }
    res.json({ user });
  } catch (error) {
    if (res.statusCode === 404) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});
export default router
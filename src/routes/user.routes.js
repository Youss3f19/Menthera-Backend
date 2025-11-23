const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const UserController = require('../controllers/user.controller');
const upload = require('../middleware/avatar.middleware');
const User = require('../models/User.model');

const router = express.Router();

router.get('/me', protect, UserController.getCurrentUser);

router.put('/profile', protect, UserController.updateProfile);

router.put('/change-password', protect, UserController.changePassword);

// POST /api/v1/avatar
router.post('/avatar', protect, upload.single('avatar'), async (req, res) => {
  if (!req.file) return res.status(400).json({ status: 'error', message: 'Pas de fichier envoyé.' });
  const avatarUrl = `${process.env.ASSET_URL || 'http://localhost:5000'}/avatars/${req.file.filename}`;
  await User.findByIdAndUpdate(req.user._id, { avatar: avatarUrl });
  res.json({ status: 'success', data: { avatar: avatarUrl } });
});



module.exports = router;

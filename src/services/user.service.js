const User = require('../models/User.model');
const ApiError = require('../utils/apiError');
const bcrypt = require('bcryptjs');

/**
 * Met à jour le profil utilisateur (name, avatar...)
 */
async function updateProfile(userId, updates) {
  const allowedFields = ['name', 'avatar'];
  const sanitized = {};
  for (const key of allowedFields) {
    if (updates[key] !== undefined) sanitized[key] = updates[key];
  }

  const user = await User.findByIdAndUpdate(userId, sanitized, { new: true, runValidators: true });
  if (!user) throw ApiError.notFound('Utilisateur non trouvé');
  return user;
}

/**
 * Récupère un utilisateur par ID (voir profil)
 */
async function getUserById(userId) {
  const user = User.findById(userId);
  if (!user) throw ApiError.notFound('Utilisateur non trouvé');
  return user;
}

/**
 * Change le mot de passe utilisateur
 */
async function updatePassword(userId, oldPassword, newPassword) {
  const user = await User.findById(userId).select('+password');
  if (!user) throw ApiError.notFound('Utilisateur non trouvé');

  const ok = await user.comparePassword(oldPassword);
  if (!ok) throw ApiError.badRequest('Ancien mot de passe incorrect');

  user.password = newPassword;
  await user.save();
  return true;
}

module.exports = { updateProfile, getUserById, updatePassword };

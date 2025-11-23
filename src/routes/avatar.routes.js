const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// dossier où stocker les avatars
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/avatars");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

// URL BASE (changer selon ton serveur)
const BASE_URL = "http://192.168.1.18:5000";

router.post("/avatar", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Aucune image envoyée" });
  }

  // URL complète pour Flutter
  const avatarUrl = `${BASE_URL}/uploads/avatars/${req.file.filename}`;

  return res.status(200).json({
    message: "Avatar uploadé avec succès",
    data: { avatar: avatarUrl }
  });
});

module.exports = router;

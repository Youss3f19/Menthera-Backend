const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Création dossier /avatars si absent
const avatarsDir = path.join(__dirname, '../avatars');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../public/avatars');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.user._id}_${Date.now()}${ext}`);
  }
});


const upload = multer({ storage });

module.exports = upload;

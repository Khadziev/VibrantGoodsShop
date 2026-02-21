import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadsDir = path.resolve(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (/^image\/(png|jpe?g|webp)$/.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Только изображения разрешены'));
  }
};

export const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 }, fileFilter });

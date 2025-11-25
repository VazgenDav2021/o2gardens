import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { config } from '../config/env';

// Ensure upload directory exists
const uploadDir = config.uploadPath;
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp-random-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    const sanitizedBasename = basename.replace(/[^a-zA-Z0-9]/g, '-');
    cb(null, `slide-${uniqueSuffix}-${sanitizedBasename}${ext}`);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, jpg, png, gif, webp) are allowed!'));
  }
};

// Single file upload middleware for slide images
export const uploadSlideImage = multer({
  storage,
  limits: {
    fileSize: config.maxFileSize, // 5MB default
  },
  fileFilter,
}).single('image');

// Single file upload middleware for hall images
export const uploadHallImage = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      const sanitizedBasename = basename.replace(/[^a-zA-Z0-9]/g, '-');
      cb(null, `hall-${uniqueSuffix}-${sanitizedBasename}${ext}`);
    },
  }),
  limits: {
    fileSize: config.maxFileSize,
  },
  fileFilter,
}).single('image');

// Single file upload middleware for event images
export const uploadEventImage = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      const sanitizedBasename = basename.replace(/[^a-zA-Z0-9]/g, '-');
      cb(null, `event-${uniqueSuffix}-${sanitizedBasename}${ext}`);
    },
  }),
  limits: {
    fileSize: config.maxFileSize,
  },
  fileFilter,
}).single('image');

// General upload middleware (can be used for other purposes)
export const upload = multer({
  storage,
  limits: {
    fileSize: config.maxFileSize,
  },
  fileFilter,
});


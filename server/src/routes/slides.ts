import express from 'express';
import {
  getSlides,
  getSlide,
  createSlide,
  updateSlide,
  deleteSlide,
} from '../controllers/slideController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getSlides);
router.get('/:id', getSlide);

// Protected admin routes
// Note: File upload is handled inside the controller using multer
router.post('/', protect, authorize('admin'), createSlide);
router.put('/:id', protect, authorize('admin'), updateSlide);
router.delete('/:id', protect, authorize('admin'), deleteSlide);

export default router;


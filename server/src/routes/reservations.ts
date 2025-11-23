import express from 'express';
import {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
} from '../controllers/reservationController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router
  .route('/')
  .get(protect, authorize('admin'), getReservations)
  .post(createReservation);

router
  .route('/:id')
  .get(protect, authorize('admin'), getReservation)
  .put(protect, authorize('admin'), updateReservation)
  .delete(protect, authorize('admin'), deleteReservation);

export default router;


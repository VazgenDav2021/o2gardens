import express from 'express';
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController';
import { protect, authorize } from '../middleware/auth';
import { validate } from '../middleware/validator';
import { createEventValidator, updateEventValidator } from '../validators/eventValidator';

const router = express.Router();

router.route('/').get(getEvents).post(protect, authorize('admin'), validate(createEventValidator), createEvent);
router
  .route('/:id')
  .get(getEvent)
  .put(protect, authorize('admin'), validate(updateEventValidator), updateEvent)
  .delete(protect, authorize('admin'), deleteEvent);

export default router;


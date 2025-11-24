import express from 'express';
import {
  getHalls,
  getHall,
  createHall,
  updateHall,
  deleteHall,
  addSchema,
  updateSchema,
  deleteSchema,
  updateTable,
  addTable,
  deleteTable,
  addScene,
  deleteScene,
} from '../controllers/hallController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Public routes
router.route('/').get(getHalls);
router.route('/:id').get(getHall);

// Protected admin routes
router.post('/', protect, authorize('admin'), createHall);
router.put('/:id', protect, authorize('admin'), updateHall);
router.delete('/:id', protect, authorize('admin'), deleteHall);

// Schema routes
router.post('/:id/schemas', protect, authorize('admin'), addSchema);
router.put('/:id/schemas/:schemaId', protect, authorize('admin'), updateSchema);
router.delete('/:id/schemas/:schemaId', protect, authorize('admin'), deleteSchema);

// Table routes
router.post('/:id/schemas/:schemaId/tables', protect, authorize('admin'), addTable);
router.put('/:id/schemas/:schemaId/tables/:tableId', protect, authorize('admin'), updateTable);
router.delete('/:id/schemas/:schemaId/tables/:tableId', protect, authorize('admin'), deleteTable);

// Scene routes
router.post('/:id/schemas/:schemaId/scenes', protect, authorize('admin'), addScene);
router.delete('/:id/schemas/:schemaId/scenes/:sceneId', protect, authorize('admin'), deleteScene);

export default router;

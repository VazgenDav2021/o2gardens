import express from 'express';
import {
  getHallSchemas,
  getHallSchema,
  createHallSchema,
  updateHallSchema,
  deleteHallSchema,
  updateTable,
  addTable,
  deleteTable,
  addScene,
  deleteScene,
} from '../controllers/hallSchemaController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router
  .route('/schemas')
  .get(getHallSchemas)
  .post(protect, authorize('admin'), createHallSchema);

router
  .route('/schemas/:id')
  .get(getHallSchema)
  .put(protect, authorize('admin'), updateHallSchema)
  .delete(protect, authorize('admin'), deleteHallSchema);

router
  .route('/schemas/:id/tables')
  .post(protect, authorize('admin'), addTable);

router
  .route('/schemas/:id/tables/:tableId')
  .put(protect, authorize('admin'), updateTable)
  .delete(protect, authorize('admin'), deleteTable);

router
  .route('/schemas/:id/scenes')
  .post(protect, authorize('admin'), addScene);

router
  .route('/schemas/:id/scenes/:sceneId')
  .delete(protect, authorize('admin'), deleteScene);

export default router;


import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';
import HallSchema from '../models/HallSchema';

// @desc    Get all hall schemas
// @route   GET /api/halls/schemas
// @access  Public
export const getHallSchemas = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { hallId, date } = req.query;

  const query: any = {};

  if (hallId) {
    query.hallId = hallId;
  }

  if (date) {
    const searchDate = new Date(date as string);
    query['dateRange.startDate'] = { $lte: searchDate };
    query['dateRange.endDate'] = { $gte: searchDate };
  }

  const schemas = await HallSchema.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: schemas.length,
    data: schemas,
  });
});

// @desc    Get single hall schema
// @route   GET /api/halls/schemas/:id
// @access  Public
export const getHallSchema = asyncHandler(async (req: AuthRequest, res: Response) => {
  const schema = await HallSchema.findById(req.params.id);

  if (!schema) {
    res.status(404).json({
      success: false,
      message: 'Hall schema not found',
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: schema,
  });
});

// @desc    Create new hall schema
// @route   POST /api/halls/schemas
// @access  Private/Admin
export const createHallSchema = asyncHandler(async (req: AuthRequest, res: Response) => {
  const schema = await HallSchema.create(req.body);

  res.status(201).json({
    success: true,
    data: schema,
  });
});

// @desc    Update hall schema
// @route   PUT /api/halls/schemas/:id
// @access  Private/Admin
export const updateHallSchema = asyncHandler(async (req: AuthRequest, res: Response) => {
  let schema = await HallSchema.findById(req.params.id);

  if (!schema) {
    res.status(404).json({
      success: false,
      message: 'Hall schema not found',
    });
    return;
  }

  schema = await HallSchema.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: schema,
  });
});

// @desc    Delete hall schema
// @route   DELETE /api/halls/schemas/:id
// @access  Private/Admin
export const deleteHallSchema = asyncHandler(async (req: AuthRequest, res: Response) => {
  const schema = await HallSchema.findById(req.params.id);

  if (!schema) {
    res.status(404).json({
      success: false,
      message: 'Hall schema not found',
    });
    return;
  }

  await schema.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Hall schema deleted successfully',
  });
});

// @desc    Update table in hall schema
// @route   PUT /api/halls/schemas/:id/tables/:tableId
// @access  Private/Admin
export const updateTable = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id, tableId } = req.params;
  const { x, y, seats, reserved } = req.body;

  const schema = await HallSchema.findById(id);

  if (!schema) {
    res.status(404).json({
      success: false,
      message: 'Hall schema not found',
    });
    return;
  }

  const table = schema.tables.id(tableId);
  if (!table) {
    res.status(404).json({
      success: false,
      message: 'Table not found',
    });
    return;
  }

  if (x !== undefined) table.x = x;
  if (y !== undefined) table.y = y;
  if (seats !== undefined) table.seats = seats;
  if (reserved !== undefined) table.reserved = reserved;

  await schema.save();

  res.status(200).json({
    success: true,
    data: schema,
  });
});

// @desc    Add table to hall schema
// @route   POST /api/halls/schemas/:id/tables
// @access  Private/Admin
export const addTable = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { x, y, seats } = req.body;

  const schema = await HallSchema.findById(id);

  if (!schema) {
    res.status(404).json({
      success: false,
      message: 'Hall schema not found',
    });
    return;
  }

  schema.tables.push({ x, y, seats, reserved: false });
  await schema.save();

  res.status(201).json({
    success: true,
    data: schema,
  });
});

// @desc    Delete table from hall schema
// @route   DELETE /api/halls/schemas/:id/tables/:tableId
// @access  Private/Admin
export const deleteTable = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id, tableId } = req.params;

  const schema = await HallSchema.findById(id);

  if (!schema) {
    res.status(404).json({
      success: false,
      message: 'Hall schema not found',
    });
    return;
  }

  schema.tables.id(tableId)?.deleteOne();
  await schema.save();

  res.status(200).json({
    success: true,
    data: schema,
  });
});

// @desc    Add scene to hall schema
// @route   POST /api/halls/schemas/:id/scenes
// @access  Private/Admin
export const addScene = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { x, y, width, height } = req.body;

  const schema = await HallSchema.findById(id);

  if (!schema) {
    res.status(404).json({
      success: false,
      message: 'Hall schema not found',
    });
    return;
  }

  schema.scenes.push({ x, y, width, height });
  await schema.save();

  res.status(201).json({
    success: true,
    data: schema,
  });
});

// @desc    Delete scene from hall schema
// @route   DELETE /api/halls/schemas/:id/scenes/:sceneId
// @access  Private/Admin
export const deleteScene = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id, sceneId } = req.params;

  const schema = await HallSchema.findById(id);

  if (!schema) {
    res.status(404).json({
      success: false,
      message: 'Hall schema not found',
    });
    return;
  }

  schema.scenes.id(sceneId)?.deleteOne();
  await schema.save();

  res.status(200).json({
    success: true,
    data: schema,
  });
});


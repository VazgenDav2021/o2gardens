import { Response } from "express";
import mongoose, { Document } from "mongoose";
import { AuthRequest } from "../middleware/auth";
import { asyncHandler } from "../middleware/asyncHandler";
import Hall from "../models/Hall";
import { uploadHallImage } from "../middleware/upload";
import { handleFileUpload, cleanupFile } from "../utils/fileUpload";
import { IHall } from "../models/Hall";
import { localizeHall } from "../utils/getLocalized";
import {
  sendSuccess,
  sendSuccessWithCount,
  sendNotFound,
  sendError,
} from "../utils/response";
import { toTimestamp } from "../utils/dateUtils";

// Wrapper for multer to handle errors properly
const uploadHallImageAsync = (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  return new Promise((resolve, reject) => {
    uploadHallImage(req, res, (err: unknown) => {
      if (err) {
        reject(err instanceof Error ? err : new Error(String(err)));
      } else {
        resolve();
      }
    });
  });
};

// @desc    Get all halls
// @route   GET /api/halls
// @access  Public
export const getHalls = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const halls = await Hall.find().sort({ createdAt: -1 });
    const locale = (req.query.locale || req.query.lang) as string;

    const localizedHalls = halls.map((hall) => localizeHall(hall, locale));

    return sendSuccessWithCount(res, localizedHalls);
  }
);

// @desc    Get single hall
// @route   GET /api/halls/:id
// @access  Public
export const getHall = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const locale = (req.query.locale || req.query.lang) as string;

  // Check if id is a valid ObjectId, otherwise search by name
  let hall: IHall | null = null;
  if (mongoose.Types.ObjectId.isValid(id)) {
    hall = await Hall.findById(id);
  } else {
    // Search by name in any language
    const halls = await Hall.find({
      $or: [
        { "name.en": { $regex: id, $options: "i" } },
        { "name.ru": { $regex: id, $options: "i" } },
        { "name.hy": { $regex: id, $options: "i" } },
      ],
    });
    hall = halls.length > 0 ? halls[0] : null;
  }

  if (!hall) {
    return sendNotFound(res, "Hall");
  }

  const localizedHall = localizeHall(hall, locale);

  return sendSuccess(res, localizedHall);
});

// @desc    Create new hall
// @route   POST /api/halls
// @access  Private/Admin
export const createHall = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    // Handle file upload
    try {
      await uploadHallImageAsync(req, res);
      const { imageUrl, isLocal } = handleFileUpload(req);

      const hallData: {
        name: Record<string, string>;
        description: Record<string, string>;
        capacity: number;
        schemas: unknown[];
        image?: string;
        isLocalFile?: boolean;
      } = {
        name: req.body.name || {},
        description: req.body.description || {},
        capacity: parseInt(req.body.capacity, 10) || 0,
        schemas: req.body.schemas || [],
        ...(imageUrl && { image: imageUrl, isLocalFile: isLocal }),
      };

      const hall = await Hall.create(hallData);
      return sendSuccess(res, hall, 201);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error uploading image";
      return sendError(res, errorMessage, 400);
    }
  }
);

// @desc    Update hall
// @route   PUT /api/halls/:id
// @access  Private/Admin
export const updateHall = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const hall = await Hall.findById(req.params.id);

    if (!hall) {
      return sendNotFound(res, "Hall");
    }

    // Handle file upload
    try {
      await uploadHallImageAsync(req, res);
      const { imageUrl } = handleFileUpload(req, hall.image);

      // Update hall
      const updateData: {
        name: Record<string, string>;
        description: Record<string, string>;
        capacity: number;
        schemas: unknown[];
        image: string;
      } = {
        name: req.body.name !== undefined ? req.body.name : hall.name,
        description:
          req.body.description !== undefined
            ? req.body.description
            : hall.description,
        capacity:
          req.body.capacity !== undefined
            ? parseInt(req.body.capacity, 10)
            : hall.capacity,
        schemas:
          req.body.schemas !== undefined ? req.body.schemas : hall.schemas,
        image: imageUrl,
      };

      const updatedHall = await Hall.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

      return sendSuccess(res, updatedHall);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error uploading image";
      return sendError(res, errorMessage, 400);
    }
  }
);

// @desc    Delete hall
// @route   DELETE /api/halls/:id
// @access  Private/Admin
export const deleteHall = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const hall = await Hall.findById(req.params.id);

    if (!hall) {
      return sendNotFound(res, "Hall");
    }

    cleanupFile(hall.image);

    await hall.deleteOne();

    return sendSuccess(res, null, 200, "Hall deleted successfully");
  }
);

// @desc    Add schema to hall
// @route   POST /api/halls/:id/schemas
// @access  Private/Admin
export const addSchema = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { dateRange, tables, scenes } = req.body;

    const hall = await Hall.findById(id);

    if (!hall) {
      res.status(404).json({
        success: false,
        message: "Hall not found",
      });
      return;
    }

    hall.schemas.push({
      dateRange: {
        startDate:
          typeof dateRange.startDate === "number"
            ? dateRange.startDate
            : toTimestamp(new Date(dateRange.startDate)),
        endDate:
          typeof dateRange.endDate === "number"
            ? dateRange.endDate
            : toTimestamp(new Date(dateRange.endDate)),
      },
      tables: tables || [],
      scenes: scenes || [],
    });

    await hall.save();

    res.status(201).json({
      success: true,
      data: hall,
    });
  }
);

// @desc    Update schema in hall
// @route   PUT /api/halls/:id/schemas/:schemaId
// @access  Private/Admin
export const updateSchema = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id, schemaId } = req.params;
    const { dateRange, tables, scenes } = req.body;

    const hall = await Hall.findById(id);

    if (!hall) {
      res.status(404).json({
        success: false,
        message: "Hall not found",
      });
      return;
    }

    const schema = hall.schemas.id(schemaId);
    if (!schema) {
      res.status(404).json({
        success: false,
        message: "Schema not found",
      });
      return;
    }

    if (dateRange) {
      schema.dateRange = {
        startDate:
          typeof dateRange.startDate === "number"
            ? dateRange.startDate
            : toTimestamp(new Date(dateRange.startDate)),
        endDate:
          typeof dateRange.endDate === "number"
            ? dateRange.endDate
            : toTimestamp(new Date(dateRange.endDate)),
      };
    }
    if (tables !== undefined) schema.tables = tables;
    if (scenes !== undefined) schema.scenes = scenes;

    await hall.save();

    res.status(200).json({
      success: true,
      data: hall,
    });
  }
);

// @desc    Delete schema from hall
// @route   DELETE /api/halls/:id/schemas/:schemaId
// @access  Private/Admin
export const deleteSchema = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id, schemaId } = req.params;

    const hall = await Hall.findById(id);

    if (!hall) {
      res.status(404).json({
        success: false,
        message: "Hall not found",
      });
      return;
    }

    hall.schemas.id(schemaId)?.deleteOne();
    await hall.save();

    res.status(200).json({
      success: true,
      data: hall,
    });
  }
);

// @desc    Update table in hall schema
// @route   PUT /api/halls/:id/schemas/:schemaId/tables/:tableId
// @access  Private/Admin
export const updateTable = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id, schemaId, tableId } = req.params;
    const { x, y, seats, reserved } = req.body;

    const hall = await Hall.findById(id);

    if (!hall) {
      res.status(404).json({
        success: false,
        message: "Hall not found",
      });
      return;
    }

    const schema = hall.schemas.id(schemaId);
    if (!schema) {
      res.status(404).json({
        success: false,
        message: "Schema not found",
      });
      return;
    }

    const tablesArray =
      schema.tables as unknown as mongoose.Types.DocumentArray<
        Document & { x: number; y: number; seats: number; reserved: boolean }
      >;
    const table = tablesArray.id(tableId);
    if (!table) {
      res.status(404).json({
        success: false,
        message: "Table not found",
      });
      return;
    }

    if (x !== undefined) table.x = x;
    if (y !== undefined) table.y = y;
    if (seats !== undefined) table.seats = seats;
    if (reserved !== undefined) table.reserved = reserved;

    await hall.save();

    res.status(200).json({
      success: true,
      data: hall,
    });
  }
);

// @desc    Add table to hall schema
// @route   POST /api/halls/:id/schemas/:schemaId/tables
// @access  Private/Admin
export const addTable = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id, schemaId } = req.params;
    const { x, y, seats } = req.body;

    const hall = await Hall.findById(id);

    if (!hall) {
      res.status(404).json({
        success: false,
        message: "Hall not found",
      });
      return;
    }

    const schema = hall.schemas.id(schemaId);
    if (!schema) {
      res.status(404).json({
        success: false,
        message: "Schema not found",
      });
      return;
    }

    schema.tables.push({ x, y, seats, reserved: false });
    await hall.save();

    res.status(201).json({
      success: true,
      data: hall,
    });
  }
);

// @desc    Delete table from hall schema
// @route   DELETE /api/halls/:id/schemas/:schemaId/tables/:tableId
// @access  Private/Admin
export const deleteTable = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id, schemaId, tableId } = req.params;

    const hall = await Hall.findById(id);

    if (!hall) {
      res.status(404).json({
        success: false,
        message: "Hall not found",
      });
      return;
    }

    const schema = hall.schemas.id(schemaId);
    if (!schema) {
      res.status(404).json({
        success: false,
        message: "Schema not found",
      });
      return;
    }

    const tablesArray =
      schema.tables as unknown as mongoose.Types.DocumentArray<
        Document & { x: number; y: number; seats: number; reserved: boolean }
      >;
    tablesArray.id(tableId)?.deleteOne();
    await hall.save();

    res.status(200).json({
      success: true,
      data: hall,
    });
  }
);

// @desc    Add scene to hall schema
// @route   POST /api/halls/:id/schemas/:schemaId/scenes
// @access  Private/Admin
export const addScene = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id, schemaId } = req.params;
    const { x, y, width, height } = req.body;

    const hall = await Hall.findById(id);

    if (!hall) {
      res.status(404).json({
        success: false,
        message: "Hall not found",
      });
      return;
    }

    const schema = hall.schemas.id(schemaId);
    if (!schema) {
      res.status(404).json({
        success: false,
        message: "Schema not found",
      });
      return;
    }

    schema.scenes.push({ x, y, width, height });
    await hall.save();

    res.status(201).json({
      success: true,
      data: hall,
    });
  }
);

// @desc    Delete scene from hall schema
// @route   DELETE /api/halls/:id/schemas/:schemaId/scenes/:sceneId
// @access  Private/Admin
export const deleteScene = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id, schemaId, sceneId } = req.params;

    const hall = await Hall.findById(id);

    if (!hall) {
      res.status(404).json({
        success: false,
        message: "Hall not found",
      });
      return;
    }

    const schema = hall.schemas.id(schemaId);
    if (!schema) {
      res.status(404).json({
        success: false,
        message: "Schema not found",
      });
      return;
    }

    const scenesArray =
      schema.scenes as unknown as mongoose.Types.DocumentArray<
        Document & { x: number; y: number; width: number; height: number }
      >;
    scenesArray.id(sceneId)?.deleteOne();
    await hall.save();

    res.status(200).json({
      success: true,
      data: hall,
    });
  }
);

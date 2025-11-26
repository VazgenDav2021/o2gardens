import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { asyncHandler } from "../middleware/asyncHandler";
import Event from "../models/Event";
import { localizeEvent } from "../utils/getLocalized";
import {
  handleRequiredFileUpload,
  handleFileUpload,
  cleanupFile,
} from "../utils/fileUpload";
import {
  parseFormDataField,
  parseNumber,
  parseBoolean,
  parseDate,
} from "../utils/formData";
import {
  sendSuccess,
  sendSuccessWithCount,
  sendNotFound,
  sendError,
} from "../utils/response";

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { hall, locale } = req.query;

    const query: any = {};

    if (hall) {
      query.hall = hall;
    }

    const events = await Event.find(query).populate("hall").sort({ date: 1 });

    const localized = events.map((event: any) =>
      localizeEvent(event, locale as string)
    );

    return sendSuccessWithCount(res, localized);
  }
);

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
export const getEvent = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const event = await Event.findById(req.params.id).populate("schemas");

    if (!event) {
      return sendNotFound(res, "Event");
    }

    const locale = (req.query.locale || req.query.lang) as string;
    const localizedEvent = localizeEvent(event, locale);

    return sendSuccess(res, localizedEvent);
  }
);

// @desc    Create new event
// @route   POST /api/events
// @access  Private/Admin
export const createEvent = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    try {
      const { imageUrl, isLocal } = handleRequiredFileUpload(req);

      const eventData = {
        name: parseFormDataField(req.body.name),
        description: parseFormDataField(req.body.description),
        artists: parseFormDataField(req.body.artists),
        menu: parseFormDataField(req.body.menu) || [],
        date: parseDate(req.body.date),
        deposit: parseNumber(req.body.deposit),
        isAdult: parseBoolean(req.body.isAdult),
        hall: req.body.hall,
        capacity: parseNumber(req.body.capacity),
        timeStart: req.body.timeStart,
        image: imageUrl,
        isLocalFile: isLocal,
      };

      const event = await Event.create(eventData);
      return sendSuccess(res, event, 201);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create event";
      return sendError(res, message, 400);
    }
  }
);

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
export const updateEvent = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return sendNotFound(res, "Event");
    }

    const { imageUrl, isLocal } = handleFileUpload(req, event.image);

    const updateData: Record<string, unknown> = {
      ...(req.body.name && { name: parseFormDataField(req.body.name) }),
      ...(req.body.description && {
        description: parseFormDataField(req.body.description),
      }),
      ...(req.body.artists && {
        artists: parseFormDataField(req.body.artists),
      }),
      ...(req.body.menu && { menu: parseFormDataField(req.body.menu) }),
      ...(req.body.date && { date: parseDate(req.body.date) }),
      ...(req.body.deposit !== undefined && {
        deposit: parseNumber(req.body.deposit),
      }),
      ...(req.body.isAdult !== undefined && {
        isAdult: parseBoolean(req.body.isAdult),
      }),
      ...(req.body.hall && { hall: req.body.hall }),
      ...(req.body.capacity !== undefined && {
        capacity: parseNumber(req.body.capacity),
      }),
      ...(req.body.timeStart && { timeStart: req.body.timeStart }),
      image: imageUrl,
      isLocalFile: isLocal,
    };

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    return sendSuccess(res, updatedEvent);
  }
);

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
export const deleteEvent = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return sendNotFound(res, "Event");
    }

    cleanupFile(event.image);

    await event.deleteOne();

    return sendSuccess(res, null, 200, "Event deleted successfully");
  }
);

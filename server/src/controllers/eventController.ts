import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { asyncHandler } from "../middleware/asyncHandler";
import Event from "../models/Event";
import { localizeEvent } from "../utils/getLocalized";
import { getPublicUrl, deleteLocalFile, isLocalFile } from "../utils/fileUtils";

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { hall, locale = "en" } = req.query;

    const query: any = {};

    if (hall) {
      query.hall = hall;
    }

    const events = await Event.find(query).populate("hall").sort({ date: 1 });

    const localized = events.map((event: any) => 
      localizeEvent(event, locale as string)
    );

    res.status(200).json({
      success: true,
      count: localized.length,
      data: localized,
    });
  }
);

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
export const getEvent = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const event = await Event.findById(req.params.id)
      .populate("schema")
      .populate("hall");

    if (!event) {
      res.status(404).json({
        success: false,
        message: "Event not found",
      });
      return;
    }

    const locale = (req.query.locale || req.query.lang) as string;
    const localizedEvent = localizeEvent(event, locale);

    res.status(200).json({
      success: true,
      data: localizedEvent,
    });
  }
);

// @desc    Create new event
// @route   POST /api/events
// @access  Private/Admin
export const createEvent = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    let imageUrl: string = "";
    let isLocal = false;

    // File upload is handled by multer middleware in the route
    if (req.file) {
      // File was uploaded via multipart/form-data
      imageUrl = getPublicUrl(req.file.filename);
      isLocal = true;
    } else {
      // Only files are allowed, no URLs
      return res.status(400).json({
        success: false,
        message: "Please provide an image file (multipart/form-data with 'image' field)",
      });
    }

    // Parse JSON strings from FormData (multer sends them as strings)
    const parseFormDataField = (field: unknown): unknown => {
      if (typeof field === "string") {
        try {
          return JSON.parse(field);
        } catch {
          return field;
        }
      }
      return field;
    };

    const eventData = {
      name: parseFormDataField(req.body.name),
      description: parseFormDataField(req.body.description),
      artists: parseFormDataField(req.body.artists),
      menu: parseFormDataField(req.body.menu) || [],
      date: new Date(Number(req.body.date)),
      deposit:
        typeof req.body.deposit === "string"
          ? Number(req.body.deposit)
          : req.body.deposit,
      isAdult: req.body.isAdult === "true" || req.body.isAdult === true,
      hall: req.body.hall,
      capacity:
        typeof req.body.capacity === "string"
          ? Number(req.body.capacity)
          : req.body.capacity,
      timeStart: req.body.timeStart,
      image: imageUrl,
      isLocalFile: isLocal,
    };

    const event = await Event.create(eventData);

    res.status(201).json({
      success: true,
      data: event,
    });
  }
);

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
export const updateEvent = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    let event = await Event.findById(req.params.id);

    if (!event) {
      res.status(404).json({
        success: false,
        message: "Event not found",
      });
      return;
    }

    // Store old file URL for potential deletion
    const oldUrl = event.image;
    const wasLocalFile = isLocalFile(oldUrl);

    let imageUrl: string = event.image;
    let isLocal = wasLocalFile;

    // File upload is handled by multer middleware in the route
    if (req.file) {
      // New file uploaded - delete old local file if it exists
      if (wasLocalFile && oldUrl) {
        deleteLocalFile(oldUrl);
      }

      imageUrl = getPublicUrl(req.file.filename);
      isLocal = true;
    }
    // If no file is provided, keep the existing image

    // Parse JSON strings from FormData if needed (multer sends them as strings)
    const parseFormDataField = (field: unknown): unknown => {
      if (typeof field === "string") {
        try {
          return JSON.parse(field);
        } catch {
          return field;
        }
      }
      return field;
    };

    const updateData: Record<string, unknown> = {
      ...(req.body.name && { name: parseFormDataField(req.body.name) }),
      ...(req.body.description && {
        description: parseFormDataField(req.body.description),
      }),
      ...(req.body.artists && { artists: parseFormDataField(req.body.artists) }),
      ...(req.body.menu && { menu: parseFormDataField(req.body.menu) }),
      ...(req.body.date && {
        date: new Date(
          typeof req.body.date === "string"
            ? Number(req.body.date)
            : req.body.date
        ),
      }),
      ...(req.body.deposit !== undefined && {
        deposit:
          typeof req.body.deposit === "string"
            ? Number(req.body.deposit)
            : req.body.deposit,
      }),
      ...(req.body.isAdult !== undefined && {
        isAdult:
          req.body.isAdult === "true" ||
          req.body.isAdult === true ||
          req.body.isAdult === "1",
      }),
      ...(req.body.hall && { hall: req.body.hall }),
      ...(req.body.capacity !== undefined && {
        capacity:
          typeof req.body.capacity === "string"
            ? Number(req.body.capacity)
            : req.body.capacity,
      }),
      ...(req.body.timeStart && { timeStart: req.body.timeStart }),
      image: imageUrl,
      isLocalFile: isLocal,
    };

    event = await Event.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: event,
    });
  }
);

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
export const deleteEvent = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
      res.status(404).json({
        success: false,
        message: "Event not found",
      });
      return;
    }

    // Delete local file if it exists
    if (event.image && isLocalFile(event.image)) {
      deleteLocalFile(event.image);
    }

    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  }
);

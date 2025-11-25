import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { asyncHandler } from "../middleware/asyncHandler";
import Event from "../models/Event";
import { getLocalized } from "../utils/getLocalized";

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

    const localized = events.map((event: any) => {
      const e = event.toObject();

      return {
        ...e,
        name: getLocalized(e.name, locale as string),
        description: getLocalized(e.description, locale as string),
        artists: getLocalized(e.artists, locale as string),

        menu: e.menu.map((item: any) => ({
          ...item,
          name: getLocalized(item.name, locale as string),
          description: getLocalized(item.description, locale as string),
        })),
        hall: getLocalized(e.hall?.name ?? {}, locale as string),
      };
    });

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

    res.status(200).json({
      success: true,
      data: event,
    });
  }
);

// @desc    Create new event
// @route   POST /api/events
// @access  Private/Admin
export const createEvent = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const eventData = {
      ...req.body,
      date: new Date(req.body.date),
      deposit:
        typeof req.body.deposit === "string"
          ? Number(req.body.deposit)
          : req.body.deposit,
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

    const updateData: Record<string, unknown> = {
      ...req.body,
      ...(req.body.date && { date: new Date(req.body.date) }),
      ...(req.body.deposit !== undefined && {
        deposit:
          typeof req.body.deposit === "string"
            ? Number(req.body.deposit)
            : req.body.deposit,
      }),
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

    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  }
);

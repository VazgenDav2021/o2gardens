import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { asyncHandler } from "../middleware/asyncHandler";
import Event from "../models/Event";

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { hall } = req.query;

    const query: any = {};

    if (hall) {
      query.hall = hall;
    }

    const events = await Event.find(query).populate("schema").populate("hall").sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  }
);

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
export const getEvent = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const event = await Event.findById(req.params.id).populate("schema").populate("hall");

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
    const event = await Event.create(req.body);

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

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
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

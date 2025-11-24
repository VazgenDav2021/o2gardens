import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';
import Reservation from '../models/Reservation';
import Hall from '../models/Hall';
import Event from '../models/Event';

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Private/Admin
export const getReservations = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { eventId, status, date } = req.query;

  const query: Record<string, any> = {};

  if (eventId) {
    query.eventId = eventId;
  }

  if (status) {
    query.status = status;
  }

  if (date) {
    query.date = new Date(date as string);
  }

  const reservations = await Reservation.find(query)
    .populate('eventId')
    .populate('hall')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: reservations.length,
    data: reservations,
  });
});

// @desc    Get single reservation
// @route   GET /api/reservations/:id
// @access  Private/Admin
export const getReservation = asyncHandler(async (req: AuthRequest, res: Response) => {
  const reservation = await Reservation.findById(req.params.id).populate('eventId').populate('hall');

  if (!reservation) {
    res.status(404).json({
      success: false,
      message: 'Reservation not found',
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: reservation,
  });
});

// @desc    Create new reservation
// @route   POST /api/reservations
// @access  Public
export const createReservation = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { tableId, hall, eventId, bookingType, contactInfo, menuItems, deposit, totalAmount, date, schemaId } = req.body;

  // If it's an event booking, reserve the table in the hall schema
  if (bookingType === 'event' && eventId && schemaId) {
    const hallDoc = await Hall.findById(hall);
    if (hallDoc) {
      const schema = hallDoc.schemas.id(schemaId);
      if (schema && schema.tables) {
        const table = (schema.tables as any).id(tableId);
        if (table) {
          table.reserved = true;
          await hallDoc.save();
        }
      }
    }
  }

  const reservation = await Reservation.create({
    eventId,
    tableId,
    hall,
    bookingType,
    contactInfo,
    menuItems: menuItems || [],
    deposit,
    totalAmount,
    date,
    status: 'pending',
  });

  res.status(201).json({
    success: true,
    data: reservation,
  });
});

// @desc    Update reservation status
// @route   PUT /api/reservations/:id
// @access  Private/Admin
export const updateReservation = asyncHandler(async (req: AuthRequest, res: Response) => {
  let reservation = await Reservation.findById(req.params.id);

  if (!reservation) {
    res.status(404).json({
      success: false,
      message: 'Reservation not found',
    });
    return;
  }

  reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: reservation,
  });
});

// @desc    Delete reservation
// @route   DELETE /api/reservations/:id
// @access  Private/Admin
export const deleteReservation = asyncHandler(async (req: AuthRequest, res: Response) => {
  const reservation = await Reservation.findById(req.params.id);

  if (!reservation) {
    res.status(404).json({
      success: false,
      message: 'Reservation not found',
    });
    return;
  }

  // If it's an event booking, unreserve the table
  if (reservation.bookingType === 'event' && reservation.eventId && reservation.hall) {
    const event = await Event.findById(reservation.eventId);
    if (event && event.schema) {
      const hallDoc = await Hall.findById(reservation.hall);
      if (hallDoc) {
        const schema = hallDoc.schemas.id(event.schema.toString());
        if (schema && schema.tables) {
          const table = (schema.tables as any).id(reservation.tableId);
          if (table) {
            table.reserved = false;
            await hallDoc.save();
          }
        }
      }
    }
  }

  await reservation.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Reservation deleted successfully',
  });
});


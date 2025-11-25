import express from "express";
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController";
import { protect, authorize } from "../middleware/auth";
import { validate } from "../middleware/validator";
import {
  createEventValidator,
  updateEventValidator,
} from "../validators/eventValidator";
import { uploadEventImage } from "../middleware/upload";

const router = express.Router();

// Wrapper to handle multer errors and make it async-compatible
const uploadEventImageMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  uploadEventImage(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || "Error uploading image",
      });
    }
    next();
  });
};

router
  .route("/")
  .get(getEvents)
  .post(
    protect,
    authorize("admin"),
    uploadEventImageMiddleware,
    validate(createEventValidator),
    createEvent
  );
router
  .route("/:id")
  .get(getEvent)
  .put(
    protect,
    authorize("admin"),
    uploadEventImageMiddleware,
    validate(updateEventValidator),
    updateEvent
  )
  .delete(protect, authorize("admin"), deleteEvent);

export default router;

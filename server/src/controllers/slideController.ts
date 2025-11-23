import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';
import Slide from '../models/Slide';
import { uploadSlideImage } from '../middleware/upload';
import { getPublicUrl, deleteLocalFile, isLocalFile } from '../utils/fileUtils';

// Wrapper for multer to handle errors properly
const uploadSlideImageAsync = (req: AuthRequest, res: Response): Promise<void> => {
  return new Promise((resolve, reject) => {
    uploadSlideImage(req, res, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// @desc    Get all slides
// @route   GET /api/hero/slides
// @access  Public
export const getSlides = asyncHandler(async (req: AuthRequest, res: Response) => {
  const slides = await Slide.find().sort({ order: 1 });

  res.status(200).json({
    success: true,
    count: slides.length,
    data: slides,
  });
});

// @desc    Get single slide
// @route   GET /api/hero/slides/:id
// @access  Public
export const getSlide = asyncHandler(async (req: AuthRequest, res: Response) => {
  const slide = await Slide.findById(req.params.id);

  if (!slide) {
    res.status(404).json({
      success: false,
      message: 'Slide not found',
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: slide,
  });
});

// @desc    Create new slide
// @route   POST /api/hero/slides
// @access  Private/Admin
export const createSlide = asyncHandler(async (req: AuthRequest, res: Response) => {
  let imageUrl: string;
  let isLocal = false;

  // Handle file upload (multer processes multipart/form-data)
  try {
    await uploadSlideImageAsync(req, res);
    
    if (req.file) {
      // File was uploaded via multipart/form-data
      imageUrl = getPublicUrl(req.file.filename);
      isLocal = true;
    } else if (req.body.url && typeof req.body.url === 'string') {
      // URL string provided (from JSON body or form-data)
      imageUrl = req.body.url.trim();
      isLocal = isLocalFile(imageUrl);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Please provide either an image file (multipart/form-data with "image" field) or a URL string',
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Error uploading image',
    });
  }

  // Parse order (could be string from form-data)
  const order = req.body.order ? parseInt(req.body.order, 10) : 0;

  // Create slide
  const slide = await Slide.create({
    url: imageUrl,
    order: isNaN(order) ? 0 : order,
    isLocalFile: isLocal,
  });

  res.status(201).json({
    success: true,
    data: slide,
  });
});

// @desc    Update slide
// @route   PUT /api/hero/slides/:id
// @access  Private/Admin
export const updateSlide = asyncHandler(async (req: AuthRequest, res: Response) => {
  const slide = await Slide.findById(req.params.id);

  if (!slide) {
    res.status(404).json({
      success: false,
      message: 'Slide not found',
    });
    return;
  }

  // Store old file URL for potential deletion
  const oldUrl = slide.url;
  const wasLocalFile = slide.isLocalFile || false;

  let imageUrl: string;
  let isLocal = false;

  // Handle file upload if new file is provided
  try {
    await uploadSlideImageAsync(req, res);
    
    if (req.file) {
      // New file uploaded - delete old local file if it exists
      if (wasLocalFile && oldUrl) {
        deleteLocalFile(oldUrl);
      }
      
      imageUrl = getPublicUrl(req.file.filename);
      isLocal = true;
    } else if (req.body.url !== undefined && req.body.url !== null) {
      // URL provided (could be updating to external URL or keeping same)
      const newUrl = typeof req.body.url === 'string' ? req.body.url.trim() : String(req.body.url);
      imageUrl = newUrl;
      isLocal = isLocalFile(newUrl);
      
      // If changing from local file to external URL, delete old file
      if (wasLocalFile && oldUrl && !isLocal && oldUrl !== newUrl) {
        deleteLocalFile(oldUrl);
      }
    } else {
      // No new image provided, keep existing
      imageUrl = slide.url;
      isLocal = wasLocalFile;
    }
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || 'Error uploading image',
    });
  }

  // Parse order (could be string from form-data)
  const order = req.body.order !== undefined 
    ? (typeof req.body.order === 'string' ? parseInt(req.body.order, 10) : req.body.order)
    : slide.order;

  // Update slide
  const updatedSlide = await Slide.findByIdAndUpdate(
    req.params.id,
    {
      url: imageUrl,
      order: isNaN(order as number) ? slide.order : order,
      isLocalFile: isLocal,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: updatedSlide,
  });
});

// @desc    Delete slide
// @route   DELETE /api/hero/slides/:id
// @access  Private/Admin
export const deleteSlide = asyncHandler(async (req: AuthRequest, res: Response) => {
  const slide = await Slide.findById(req.params.id);

  if (!slide) {
    res.status(404).json({
      success: false,
      message: 'Slide not found',
    });
    return;
  }

  // Delete local file if it exists
  if (slide.isLocalFile && slide.url) {
    deleteLocalFile(slide.url);
  }

  await slide.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Slide deleted successfully',
  });
});

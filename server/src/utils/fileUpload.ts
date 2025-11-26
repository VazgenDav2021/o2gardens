import { Request } from "express";
import { getPublicUrl, deleteLocalFile, isLocalFile } from "./fileUtils";

export interface FileUploadResult {
  imageUrl: string;
  isLocal: boolean;
}

/**
 * Handle file upload from multer, with fallback to URL string
 * @param req - Express request with file
 * @param existingUrl - Existing URL to use if no new file provided
 * @returns File upload result
 */
export const handleFileUpload = (
  req: Request,
  existingUrl?: string
): FileUploadResult => {
  let imageUrl: string = existingUrl || "";
  let isLocal = existingUrl ? isLocalFile(existingUrl) : false;

  if (req.file) {
    // New file uploaded - delete old local file if it exists
    if (existingUrl && isLocalFile(existingUrl)) {
      deleteLocalFile(existingUrl);
    }
    imageUrl = getPublicUrl(req.file.filename);
    isLocal = true;
  } else if (req.body.image !== undefined && req.body.image !== null) {
    // URL provided (could be updating to external URL or keeping same)
    const newUrl =
      typeof req.body.image === "string"
        ? req.body.image.trim()
        : String(req.body.image);
    imageUrl = newUrl;
    isLocal = isLocalFile(newUrl);

    // If changing from local file to external URL, delete old file
    if (existingUrl && isLocalFile(existingUrl) && !isLocal && existingUrl !== newUrl) {
      deleteLocalFile(existingUrl);
    }
  }

  return { imageUrl, isLocal };
};

/**
 * Handle file upload for slides (uses 'url' field instead of 'image')
 * @param req - Express request with file
 * @param existingUrl - Existing URL to use if no new file provided
 * @returns File upload result
 */
export const handleSlideUpload = (
  req: Request,
  existingUrl?: string
): FileUploadResult => {
  let imageUrl: string = existingUrl || "";
  let isLocal = existingUrl ? isLocalFile(existingUrl) : false;

  if (req.file) {
    // New file uploaded - delete old local file if it exists
    if (existingUrl && isLocalFile(existingUrl)) {
      deleteLocalFile(existingUrl);
    }
    imageUrl = getPublicUrl(req.file.filename);
    isLocal = true;
  } else if (req.body.url !== undefined && req.body.url !== null) {
    // URL provided (could be updating to external URL or keeping same)
    const newUrl =
      typeof req.body.url === "string" ? req.body.url.trim() : String(req.body.url);
    imageUrl = newUrl;
    isLocal = isLocalFile(newUrl);

    // If changing from local file to external URL, delete old file
    if (existingUrl && isLocalFile(existingUrl) && !isLocal && existingUrl !== newUrl) {
      deleteLocalFile(existingUrl);
    }
  }

  return { imageUrl, isLocal };
};

/**
 * Handle file upload that requires a file (no URL fallback)
 * @param req - Express request with file
 * @returns File upload result
 * @throws Error if no file provided
 */
export const handleRequiredFileUpload = (req: Request): FileUploadResult => {
  if (!req.file) {
    throw new Error(
      "Please provide an image file (multipart/form-data with 'image' field)"
    );
  }

  return {
    imageUrl: getPublicUrl(req.file.filename),
    isLocal: true,
  };
};

/**
 * Clean up old file when deleting entity
 * @param fileUrl - URL of file to delete
 * @param isLocal - Whether file is local (optional, will check if not provided)
 */
export const cleanupFile = (fileUrl: string): void => {
  if (fileUrl) {
    const shouldDelete = isLocalFile(fileUrl);
    if (shouldDelete) {
      deleteLocalFile(fileUrl);
    }
  }
};


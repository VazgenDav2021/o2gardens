import fs from 'fs';
import path from 'path';
import { config } from '../config/env';

/**
 * Check if a URL is a local uploaded file
 * @param url - The URL to check
 * @returns true if the URL points to a local upload, false otherwise
 */
export const isLocalFile = (url: string): boolean => {
  if (!url) return false;
  
  // Check if URL starts with /uploads/ (local file path)
  if (url.startsWith('/uploads/')) {
    return true;
  }
  
  // Check if URL is a relative path to uploads directory
  if (url.startsWith('uploads/') || url.startsWith('./uploads/')) {
    return true;
  }
  
  // Check if it's an absolute path to uploads directory
  const uploadPath = path.resolve(config.uploadPath);
  if (path.isAbsolute(url) && url.startsWith(uploadPath)) {
    return true;
  }
  
  return false;
};

/**
 * Get the file path from a URL
 * @param url - The URL to extract path from
 * @returns The file path relative to uploads directory
 */
export const getFilePathFromUrl = (url: string): string | null => {
  if (!isLocalFile(url)) {
    return null;
  }
  
  // Extract filename from URL
  let filename = url;
  
  // Remove /uploads/ prefix
  if (filename.startsWith('/uploads/')) {
    filename = filename.replace('/uploads/', '');
  } else if (filename.startsWith('uploads/')) {
    filename = filename.replace('uploads/', '');
  } else if (filename.startsWith('./uploads/')) {
    filename = filename.replace('./uploads/', '');
  }
  
  // Remove query parameters if any
  filename = filename.split('?')[0];
  
  return filename;
};

/**
 * Delete a local file from the uploads directory
 * @param url - The URL of the file to delete
 * @returns true if file was deleted, false otherwise
 */
export const deleteLocalFile = (url: string): boolean => {
  if (!isLocalFile(url)) {
    return false;
  }
  
  const filename = getFilePathFromUrl(url);
  if (!filename) {
    return false;
  }
  
  const filePath = path.join(config.uploadPath, filename);
  
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error);
  }
  
  return false;
};

/**
 * Get the public URL for an uploaded file
 * @param filename - The filename of the uploaded file
 * @returns The public URL path
 */
export const getPublicUrl = (filename: string): string => {
  return `/uploads/${filename}`;
};


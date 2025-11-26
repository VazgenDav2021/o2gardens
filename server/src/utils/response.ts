import { Response } from "express";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
}

/**
 * Send success response
 */
export const sendSuccess = <T>(
  res: Response,
  data: T,
  statusCode: number = 200,
  message?: string
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    ...(message && { message }),
    data,
  };
  return res.status(statusCode).json(response);
};

/**
 * Send success response with count
 */
export const sendSuccessWithCount = <T>(
  res: Response,
  data: T[],
  statusCode: number = 200
): Response => {
  const response: ApiResponse<T[]> = {
    success: true,
    count: data.length,
    data,
  };
  return res.status(statusCode).json(response);
};

/**
 * Send error response
 */
export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 400
): Response => {
  const response: ApiResponse = {
    success: false,
    message,
  };
  return res.status(statusCode).json(response);
};

/**
 * Send not found response
 */
export const sendNotFound = (res: Response, resource: string = "Resource"): Response => {
  return sendError(res, `${resource} not found`, 404);
};


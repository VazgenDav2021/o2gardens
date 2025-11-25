import { body } from 'express-validator';

// Helper to parse JSON string from FormData
const parseJsonString = (value: unknown): unknown => {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
};

// Helper to parse numeric string from FormData
const parseNumericString = (value: unknown): number | unknown => {
  if (typeof value === 'string') {
    const parsed = Number(value);
    if (!isNaN(parsed)) {
      return parsed;
    }
  }
  return value;
};

export const createEventValidator = [
  body('name')
    .custom((value) => {
      const parsed = parseJsonString(value);
      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        throw new Error('Name must be an object with locale keys');
      }
      return true;
    })
    .withMessage('Name must be an object with locale keys'),
  body('date')
    .custom((value) => {
      const parsed = parseNumericString(value);
      if (typeof parsed !== 'number' || isNaN(parsed)) {
        throw new Error('Date must be a valid timestamp (number)');
      }
      return true;
    })
    .withMessage('Date must be a valid timestamp (number)'),
  body('deposit')
    .custom((value) => {
      const parsed = parseNumericString(value);
      if (typeof parsed !== 'number' || isNaN(parsed)) {
        throw new Error('Deposit must be a number');
      }
      return true;
    })
    .withMessage('Deposit must be a number'),
  body('hall')
    .notEmpty()
    .withMessage('Hall is required'),
  body('capacity')
    .custom((value) => {
      const parsed = parseNumericString(value);
      if (typeof parsed !== 'number' || !Number.isInteger(parsed) || parsed < 1) {
        throw new Error('Capacity must be a positive integer');
      }
      return true;
    })
    .withMessage('Capacity must be a positive integer'),
  body('timeStart')
    .notEmpty()
    .withMessage('Time start is required'),
];

export const updateEventValidator = [
  body('name')
    .optional()
    .custom((value) => {
      if (value === undefined || value === null) return true;
      const parsed = parseJsonString(value);
      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
        throw new Error('Name must be an object with locale keys');
      }
      return true;
    })
    .withMessage('Name must be an object with locale keys'),
  body('date')
    .optional()
    .custom((value) => {
      if (value === undefined || value === null) return true;
      const parsed = parseNumericString(value);
      if (typeof parsed !== 'number' || isNaN(parsed)) {
        throw new Error('Date must be a valid timestamp (number)');
      }
      return true;
    })
    .withMessage('Date must be a valid timestamp (number)'),
  body('deposit')
    .optional()
    .custom((value) => {
      if (value === undefined || value === null) return true;
      const parsed = parseNumericString(value);
      if (typeof parsed !== 'number' || isNaN(parsed)) {
        throw new Error('Deposit must be a number');
      }
      return true;
    })
    .withMessage('Deposit must be a number'),
];


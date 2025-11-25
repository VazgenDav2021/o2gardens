import { body } from 'express-validator';

export const createEventValidator = [
  body('name')
    .isObject()
    .withMessage('Name must be an object with locale keys'),
  body('date')
    .isNumeric()
    .withMessage('Date must be a valid timestamp (number)'),
  body('deposit')
    .isNumeric()
    .withMessage('Deposit must be a number'),
  body('hall')
    .notEmpty()
    .withMessage('Hall is required'),
  body('capacity')
    .isInt({ min: 1 })
    .withMessage('Capacity must be a positive integer'),
  body('timeStart')
    .notEmpty()
    .withMessage('Time start is required'),
];

export const updateEventValidator = [
  body('name')
    .optional()
    .isObject()
    .withMessage('Name must be an object with locale keys'),
  body('date')
    .optional()
    .isNumeric()
    .withMessage('Date must be a valid timestamp (number)'),
  body('deposit')
    .optional()
    .isNumeric()
    .withMessage('Deposit must be a number'),
];


import z from 'zod';
import { extractValidationData } from '../common/utils/extractErrorData.js';

const repairsCreateSchema = z.object({
  date: z.string({
    invalid_type_error: 'Date must be a string',
    required_error: 'date is required',
  }),
  motorsNumber: z
    .string({
      invalid_type_error: 'Date must be a string',
      required_error: 'date is required',
    })
    .min(8, { message: 'Motor number is too short' }),
  description: z
    .string({
      invalid_type_error: 'Date must be a string',
      required_error: 'date is required',
    })
    .min(20, { message: 'description is too short' })
    .max(255, { meessage: 'description is too long' }),
  userId: z
    .number({
      invalid_type_error: 'userID must be a string',
      required_error: 'userID is required',
    })
    .int({ message: 'userID must be a integer' })
    .positive({ message: 'userID must be a positive number' }),
});

export function validateRepair(data) {
  const result = repairsCreateSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: repairData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    repairData,
  };
}

export function validatePartialRepair(data) {
  const result = repairsCreateSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessages,
    data: repairData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    repairData,
  };
}

// date
// motorsNumber
// description
// status
// userId

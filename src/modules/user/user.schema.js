import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const userRegisterSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'name must be a string',
      required_error: 'Name is require',
    })
    .min(3, { message: 'Name is too short (3 min)' })
    .max(60, { message: 'Name is too long (60 max)' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string({
      invalid_type_error: 'password must be a string',
      required_error: 'password is require',
    })
    .min(8, { message: 'Password is too short(8 min)' })
    .max(15, { message: 'Password is too long(15 max)' }),
  role: z.enum(['employee', 'client']),
});

const loginUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string({
      invalid_type_error: 'password must be a string',
      required_error: 'password is require',
    })
    .min(8, { message: 'Password is too short(8 min)' })
    .max(15, { message: 'Password is too long(15 max)' }),
});

export function validateUser(data) {
  const result = userRegisterSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
}

export function validatePartialUser(data) {
  const result = userRegisterSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
}

export function validateLogin(data) {
  const result = loginUserSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
}

// name
// email
// password
// role
// status

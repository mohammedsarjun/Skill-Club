import { ZodError, ZodType } from 'zod';
import AppError from './app-error';
import { ERROR_MESSAGES } from '../contants/error-constants';
import { HttpStatus } from '../enums/http-status.enum';

export const validateData = <T>(schema: ZodType<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } catch (err) {
    if (err instanceof ZodError) {
      //   const validationErrors = err.issues.map((e) => ({
      //     field: e.path.join('.'),
      //     message: e.message,
      //   }));
      console.log(err.issues[0]);
      throw new AppError(ERROR_MESSAGES.VALIDATION.FAILED, HttpStatus.BAD_REQUEST);
    }

    // Rethrow other types of errors
    throw err;
  }
};

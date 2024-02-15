import { StatusCodes } from 'http-status-codes';
import { HttpError } from './index.js';
import { ValidationErrorField } from '../index.js';

export class ValidationError extends HttpError {
  public details: ValidationErrorField[] = [];

  constructor(message: string, errors: ValidationErrorField[]) {
    super(StatusCodes.BAD_REQUEST, message);
    this.details = errors;
  }
}

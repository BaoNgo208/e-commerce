import { BaseError } from './BaseException';
import { ErrorCodes } from './ErrorCode';

export class BadRequestException extends BaseError {
  constructor(message: string, errorCode = ErrorCodes.VALIDATION_ERROR) {
    super(message, 400, errorCode);
  }
}

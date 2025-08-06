export class BaseError extends Error {
  public statusCode: number;
  public errorCode: number;
  constructor(message: string, statusCode: number, errorCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

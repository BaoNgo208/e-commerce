import { Request, Response, NextFunction } from 'express';
import { BaseError } from '~/exceptions/BaseException';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      errorCode: err.errorCode,
      message: err.message
    });
  }

  console.error(err);
  return res.status(500).json({
    errorCode: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong'
  });
};

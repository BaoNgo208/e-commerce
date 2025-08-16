import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import authConfig from '~/configs/auth.config';
import { BaseError } from '~/exceptions/BaseException';
import { ErrorCodes } from '~/exceptions/ErrorCode';
import { PUBLIC_ROUTES } from '~/constants/routes';

export interface MyJwtPayload extends JwtPayload {
  id: string;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (PUBLIC_ROUTES.some((route) => req.path.startsWith(route) || req.originalUrl.startsWith(route))) {
      console.log('skipppppppppppppppp');
      return next();
    }
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new BaseError('No token provided!', 403, ErrorCodes.TOKEN_MISSING);
    }
    const token = authHeader.replace('Bearer ', '').trim();

    const decoded = jwt.verify(token, authConfig.secret) as MyJwtPayload;
    console.log('decoded:', decoded);
    if (!decoded.id) {
      throw new BaseError('Invalid token payload!', 401, ErrorCodes.TOKEN_INVALID);
    }
    res.locals.userId = decoded.id;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return next(new BaseError('Token expired!', 401, ErrorCodes.TOKEN_EXPIRED));
    }
    next(error);
  }
};

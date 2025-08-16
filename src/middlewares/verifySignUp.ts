import { Request, Response, NextFunction } from 'express';
import { BaseError } from '~/exceptions/BaseException';
import { ErrorCodes } from '~/exceptions/ErrorCode';
import prisma from '~/utils/prisma/prisma';

export const checkDuplicateUsernameOrEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userById = await prisma.users.findFirst({
      where: {
        email: req.body.email
      }
    });
    console.log('id:', req.body.email);
    if (userById) {
      throw new BaseError('Username is already in use!', 400, ErrorCodes.USER_ALREADY_EXISTED);
    }

    const userByEmail = await prisma.users.findFirst({
      where: {
        email: req.body.email
      }
    });

    if (userByEmail) {
      throw new BaseError('Email is already in use!Username is already in use!', 400, ErrorCodes.EMAIL_ALREADY_USED);
    }
    next();
  } catch (error) {
    next(error);
  }
};

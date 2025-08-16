import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserService } from '~/services/user.service';
import { BaseError } from '~/exceptions/BaseException';
import { ErrorCodes } from '~/exceptions/ErrorCode';
import authConfig from '~/configs/auth.config';
import redis from '~/configs/redis.client';
import { MyJwtPayload } from '~/middlewares/authJwt';

export class AuthController {
  private userService = new UserService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const password_hash = await bcrypt.hash(password, 8);
      const newuser = await this.userService.create({ email, password_hash });
      res.status(201).json(newuser);
    } catch (error) {
      next(error);
    }
  };

  public signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.getByEmail(email);
      if (!user) {
        throw new BaseError('User not found.', 404, ErrorCodes.USER_NOT_FOUND);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password_hash ?? '');
      if (!isPasswordValid) {
        throw new BaseError('Invalid password!', 401, ErrorCodes.INVALID_PASSWORD);
      }

      const token = jwt.sign({ id: user.id, email: user.email, role: user.role?.name }, authConfig.secret, {
        expiresIn: '15m'
      });

      const refreshToken = jwt.sign({ id: user.id, email: user.email }, authConfig.refresh_secret, {
        expiresIn: '30d'
      });

      await redis.set(`refresh_token:${user.id}`, refreshToken, 'EX', 30 * 24 * 60 * 60);
      const response = { token: token, role: user.role?.name };
      res
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          sameSite: 'lax',
          secure: false,
          maxAge: 30 * 24 * 60 * 60 * 1000
        })
        .json(response);
    } catch (error) {
      next(error);
    }
  };

  public refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new BaseError('No token provided!', 401, ErrorCodes.TOKEN_MISSING);
      }

      let decoded: MyJwtPayload;
      decoded = jwt.verify(refreshToken, authConfig.refresh_secret) as MyJwtPayload;
      if (!decoded.id) {
        throw new BaseError('Invalid token payload!', 401, ErrorCodes.TOKEN_INVALID);
      }

      const storedToken = await redis.get(`refresh_token:${decoded.id}`);
      if (!storedToken || storedToken !== refreshToken) {
        throw new BaseError('Refresh token not found or expired!', 401, ErrorCodes.TOKEN_INVALID);
      }

      const newAccessToken = jwt.sign({ id: decoded.id, email: decoded.email }, authConfig.secret, {
        expiresIn: '15m'
      });

      res.json({
        accessToken: newAccessToken
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new AuthController();

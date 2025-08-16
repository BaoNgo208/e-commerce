import { Router } from 'express';
import authController from '~/controllers/auth.controller';
import { checkDuplicateUsernameOrEmail } from '~/middlewares/verifySignUp';
import cors from 'cors';

const authRouter = Router();

authRouter.post('/sign-up', checkDuplicateUsernameOrEmail, authController.signUp);
authRouter.post('/sign-in', authController.signIn);
authRouter.post('/refresh-access-token', authController.refreshToken);

export default authRouter;

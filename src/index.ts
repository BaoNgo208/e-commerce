import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';
import productRouter from './routes/product.routes';
import productSectionRouter from './routes/product-section.routes';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';
import { verifyToken } from './middlewares/authJwt';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser()); // parse cookie
app.use(verifyToken);

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/product-section', productSectionRouter);

// middleware
app.use(errorHandler);

app.listen(5500, () => {
  console.log(`🚀 Server is running at http://localhost:5500`);
});

import 'reflect-metadata';
import express from 'express';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';
import mainRoute from './routes/main.routes';
import productRouter from './routes/product.routes';
import productSectionRouter from './routes/product-section.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/product-section', productSectionRouter);
app.use('/', mainRoute);

//middleware
app.use(errorHandler);

app.listen(5500, () => {
  console.log(`🚀 Server is running at http://localhost:${5500}`);
});

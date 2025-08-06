import { Router } from 'express';

const mainRoute = Router();

mainRoute.get('/', (req, res) => res.send('Hello, Ngô Gia Bảo!'));

export default mainRoute;

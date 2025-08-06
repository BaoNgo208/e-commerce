import { Router } from 'express';

const userRouter = Router();

userRouter.get('/users', (req, res) => res.send({ title: 'Get all user' }));

userRouter.get('/:id', (req, res) => res.send({ title: 'Get user details' }));

userRouter.post('/', (req, res) => res.send({ title: 'Create new user' }));

userRouter.put('/:id', (req, res) => res.send({ title: 'Update user' }));

userRouter.delete('/:id', (req, res) => res.send({ title: 'Delete all user' }));

export default userRouter;

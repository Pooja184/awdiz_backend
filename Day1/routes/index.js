import {Router} from 'express';
import authRouter from './auth.routes.js';
import productRouter from './products.routes.js';

const mainRouter=Router();

mainRouter.use('/auth',authRouter);
mainRouter.use('/product',productRouter);

export default mainRouter;
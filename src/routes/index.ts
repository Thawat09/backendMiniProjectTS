import { Router } from 'express';
import config from '../configs/app';
import exampleRouter from './example/index';

const router = Router();

router.use(`/api/${config.version}/example`, exampleRouter);

export default router;
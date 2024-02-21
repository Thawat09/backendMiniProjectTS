import { Router } from 'express';
import indexController from '../../controllers/example/example.comtroller';

const router = Router();

router.use('/', indexController);

export default router;
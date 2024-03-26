import { Router } from 'express';
import { user_router_v1 } from './user';

const router = Router();

router.use('/user', user_router_v1);

export { router as router_v1 };

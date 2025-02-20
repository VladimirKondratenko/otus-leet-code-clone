import { Router } from 'express';
import { userRoutes } from './user.routes';
import { problemRoutes } from './problem.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/problems', problemRoutes);

export { router as routes }; 
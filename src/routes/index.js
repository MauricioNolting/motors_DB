import { router as repairsRouter } from '../modules/repairs/repairs.routes.js';
import { protect } from '../modules/user/user.middleware.js';
import { router as usersRouter } from '../modules/user/user.routes.js';

import express from 'express';

const router = express.Router();

router.use('/users', usersRouter);
router.use(protect);
router.use('/repairs', repairsRouter);

export default router;

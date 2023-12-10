import { router as repairsRouter } from '../modules/repairs/repairs.routes.js';
import { router as usersRouter } from '../modules/user/user.routes.js';

import express from 'express';

const router = express.Router();

router.use('/repairs', repairsRouter);
router.use('/users', usersRouter);

export default router;

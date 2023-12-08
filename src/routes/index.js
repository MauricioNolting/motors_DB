import { router as repairsRouter } from '../repairs/repairs.routes.js';
import { router as usersRouter } from '../user/user.routes.js';

import express from 'express';

const router = express.Router();

router.use('/repairs', repairsRouter);
router.use('/users', usersRouter);

export default router;

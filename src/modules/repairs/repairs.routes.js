import express from 'express';
export const router = express.Router();

import repairsControllers from './repairs.controllers.js';
import { validateRepairs } from './repairs.middleware.js';

router.get('/', repairsControllers.findAll);
router.post('/', repairsControllers.create);

router
  .route('/:id')
  .get(validateRepairs, repairsControllers.findOne)
  .patch(validateRepairs, repairsControllers.repairUpdate)
  .delete(validateRepairs, repairsControllers.deleteRepair);

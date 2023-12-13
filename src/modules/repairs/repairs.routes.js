import express from 'express';
export const router = express.Router();

import repairsControllers from './repairs.controllers.js';
import {
  validatePendingRepairs,
  validateRepairs,
} from './repairs.middleware.js';

router.get('/', validatePendingRepairs, repairsControllers.findAll);
router.post('/', repairsControllers.create);

router
  .route('/:id')
  .get(validateRepairs, repairsControllers.findOne)
  .patch(validateRepairs, repairsControllers.repairUpdate)
  .delete(validateRepairs, repairsControllers.deleteRepair);

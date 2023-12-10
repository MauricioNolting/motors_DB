import express from 'express';
export const router = express.Router();

import userControllers from './user.controllers.js';
import { validateUser } from './user.middleware.js';

router.get('/', userControllers.findAll);

router.post('/', userControllers.create);

router
  .route('/:id')
  .get(validateUser, userControllers.findOne)
  .patch(validateUser, userControllers.update)
  .delete(validateUser, userControllers.deleteUser);

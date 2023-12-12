import express from 'express';
export const router = express.Router();

import userControllers from './user.controllers.js';
import { protect, validateUser } from './user.middleware.js';

router.get('/', userControllers.findAll);

router.post('/login', userControllers.login);

router.post('/', userControllers.create);

router
  .route('/:id')
  .get(protect, validateUser, userControllers.findOne)
  .patch(validateUser, userControllers.update)
  .delete(validateUser, userControllers.deleteUser);

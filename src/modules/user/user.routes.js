import express from 'express';
export const router = express.Router();

import userControllers from './user.controllers.js';
import {
  protect,
  protectAcoountOwner,
  restictTo,
  validateUser,
} from './user.middleware.js';

router.post('/', userControllers.create);

router.post('/login', userControllers.login);

//proteger las rutas
router.use(protect);

router.get('/', restictTo('employee'), userControllers.findAll);

router.patch('/change-password', userControllers.changePassword);

router
  .route('/:id')
  .get(restictTo('employee'), validateUser, userControllers.findOne)
  .patch(
    restictTo('employee'),
    validateUser,
    protectAcoountOwner,
    userControllers.update
  )
  .delete(
    validateUser,
    protectAcoountOwner,
    restictTo('employee'),
    userControllers.deleteUser
  );

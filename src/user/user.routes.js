import express from 'express';
export const router = express.Router();

import userControllers from './user.controllers.js';

router.get('/', userControllers.findAll);
router.post('/', userControllers.create);
router.get('/:id', userControllers.findOne);
router.patch('/:id', userControllers.update);
router.delete('/:id', userControllers.deleteUser);

import express from 'express';
export const router = express.Router();

import repairsControllers from './repairs.controllers.js';

router.get('/', repairsControllers.findAll);
router.post('/', repairsControllers.create);
router.get('/:id', repairsControllers.findOne);
router.patch('/:id', repairsControllers.update);
router.delete('/:id', repairsControllers.deleteUser);

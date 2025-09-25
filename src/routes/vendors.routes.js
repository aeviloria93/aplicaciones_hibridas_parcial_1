import { Router } from 'express';
import * as ctrl from '../controllers/vendors.controller.js';
import validateObjectId from '../middlewares/validateObjectId.js';

const router = Router();
router.get('/', ctrl.list);
router.get('/:id', validateObjectId, ctrl.getOne);
router.post('/', ctrl.create);
router.put('/:id', validateObjectId, ctrl.update);
router.delete('/:id', validateObjectId, ctrl.remove);
export default router;

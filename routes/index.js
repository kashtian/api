import express from 'express';
import wx from './wx';
import push from './server-push';

const router = express.Router();

router.use('/wx', wx);
router.use('/push', push);

export default router;
import express from 'express';
import wx from './wx';
import crypto from './crypto';

const router = express.Router();

router.use('/wx', wx);
router.use('/crypto', crypto);

export default router;
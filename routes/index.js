import express from 'express';
import wx from './wx';

const router = express.Router();

router.use('/wx', wx);

export default router;
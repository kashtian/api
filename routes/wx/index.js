import express from 'express';
import { wx } from '../../service';
import helper from '../helper';

const router = express.Router();

router.get('/sign', (req, res) => {
    wx.generateSignature(req.headers.referer)
        .then(_data => {
            helper.comSuccess(res, _data);
        }).catch(err => {
            helper.comError(res, err);
        })
})

export default router;
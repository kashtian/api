import express from 'express';
import { wx, wxDev } from '../../service';
import helper from '../helper';
import log4js from 'log4js';

const log = log4js.getLogger('wx-route');

const router = express.Router();

router.get('/sign', (req, res) => {
    wx.generateSignature(req.headers.referer)
        .then(_data => {
            helper.comSuccess(res, _data);
        }).catch(err => {
            helper.comError(res, err);
        })
})

/**
 * 微信成为开发者接口
 */
router.get('/beDev', (req, res) => {
    log.debug('echostr: ', req.query.echostr);
    let params = [req.query.timestamp, req.query.nonce];
    if (wxDev.checkSignature(params, req.query.signature)) {
        log.debug('send!');
        res.send(req.query.echostr);
    } else {
        res.send('error');
    }
})

export default router;
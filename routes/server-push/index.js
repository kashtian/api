import express from 'express';
import { cryptoHelper, redisHelper, pushMsg } from '../../service';
import helper from '../helper';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/getAppKey', async (req, res) => {
    pushMsg.getAppKey().then(appKeyInfo => {
        helper.comSuccess(res, {
            publicKey: appKeyInfo.publicKey,
            pubKeyBase64: appKeyInfo.pubKeyBase64
        })
    }).catch(err => {
        helper.comError(res, err);
    })          
})

router.post('/saveSubscription', (req, res) => {
    if (!req.body.pushSubscription) {
        helper.comError(res, {message: 'pushSubscription can not be empty.'});
    } else {
        pushMsg.setClients(req.body.pushSubscription.endpoint, req.body.pushSubscription.keys)
        .then(() => {
            helper.comSuccess(res, null, 'save subscription success');
        })
    }
    
})

router.post('/delSubscription', (req, res) => {
    if (!req.body.endpoint) {
        helper.comError(res, {message: 'endpoint can not be empty.'});
    } else {
        pushMsg.deleteClient(req.body.endpoint).then(() => {
            helper.comSuccess(res, null, 'Delete subscription success')
        })
    }
})

router.get('/sendMsg', async (req, res) => {
    pushMsg.sendMsg(req.query.x || '通知测试，请知悉');
    helper.comSuccess(res, null, 'push success');
})

export default router;
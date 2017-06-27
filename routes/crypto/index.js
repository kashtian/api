import express from 'express';
import { cryptoHelper, redisHelper } from '../../service';
import helper from '../helper';
import fetch from 'node-fetch';
import webPush from 'web-push';

const router = express.Router();

router.get('/appServerKey', async (req, res) => {
    let cacheAppKey = await redisHelper.getValue('cacheAppKey', true);
    if (!cacheAppKey) {        
        try {
            cacheAppKey = cryptoHelper.generateVAPIDKeys();
            redisHelper.setValue('cacheAppKey', cacheAppKey);
        } catch (err) {
            helper.comError(res, err);
        }
    }
    helper.comSuccess(res, {
        publicKey: cacheAppKey.publicKey,
        pubKeyBase64: cacheAppKey.pubKeyBase64
    });      
})

router.post('/endPoint', (req, res) => {
    if (req.body.pushSubscription) {
        setClients(req.body.pushSubscription.endpoint, req.body.pushSubscription.keys)
            .then(() => {
                helper.comSuccess(res, null, 'set endpoint success');
            })
    } else {
        helper.comError(res, {message: 'set endpoint fail'});
    }
})

async function setClients(key, endpoint) {
    let map = await redisHelper.getValue('clients', true) || {};
    map[key] = endpoint;
    redisHelper.setValue('clients', map);
}

async function deleteClient(key) {
    let map = await redisHelper.getValue('clients', true) || {};
    delete map[key];
    redisHelper.setValue('clients', map);
}

router.post('/delEndpoint', (req, res) => {
    if (!req.body.endpoint) {
        helper.comError(res, {message: 'endpoint can not be empty.'});
    } else {
        deleteClient(req.body.endpoint).then(() => {
            helper.comSuccess(res, null, 'Delete endpoint success')
        })
    }
})

router.get('/test', async (req, res) => {
    let clients = await redisHelper.getValue('clients', true);
    let cacheAppKey = await redisHelper.getValue('cacheAppKey', true);
    for (let key in clients) {
        console.log('endpoint: ', key);
        webPush.sendNotification({
            endpoint: key,
            keys: clients[key]
        }, 'just test test', {
            gcmAPIKey: 'AIzaSyBziLvVkl9WFpexjCrhlZNKBqCp08RTfCs',
            vapidDetails: {
                subject: 'mailto: tianshiya1991@163.com',
                publicKey: cacheAppKey.pubKeyBase64,
                privateKey: cacheAppKey.priKeyBase64
            },
            TTL: 60
        }).catch(err => {
            console.log('why: =====>', err);
        })
    }
    helper.comSuccess(res, null, 'push success');
})

export default router;
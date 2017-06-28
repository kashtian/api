import cryptoHelper from '../crypto';
import redisHelper from '../redis-helper';
import webPush from 'web-push';

let gcmAPIKey = 'AIzaSyBziLvVkl9WFpexjCrhlZNKBqCp08RTfCs',
    subject = 'mailto: tianshiya1991@163.com';

export default {
    // 获取applicationServerKey
    getAppKey() {
        return redisHelper.getValue('cacheAppKey', true)
            .then(cacheAppKey => {
                if (!cacheAppKey) {
                    cacheAppKey = cryptoHelper.generateVAPIDKeys();
                    redisHelper.setValue('cacheAppKey', cacheAppKey);
                }
                return cacheAppKey;
            })
    },

    // 存储各客户端的subscription
    async setClients(key, value) {
        let map = await redisHelper.getValue('clients', true) || {};
        map[key] = value;
        redisHelper.setValue('clients', map);
    },

    // 删除某客户端的subscription
    async deleteClient(key) {
        let map = await redisHelper.getValue('clients', true) || {};
        delete map[key];
        redisHelper.setValue('clients', map);
    },

    // 向service worker推送消息
    async sendMsg(msg, options) {
        let clients = await redisHelper.getValue('clients', true),
            cacheAppKey = await redisHelper.getValue('cacheAppKey', true);

        for (let key in clients) {
            webPush.sendNotification({
                endpoint: key,
                keys: clients[key]
            }, msg || '通知', Object.assign({
                gcmAPIKey: gcmAPIKey,
                vapidDetails: {
                    subject: subject,
                    publicKey: cacheAppKey.pubKeyBase64,
                    privateKey: cacheAppKey.priKeyBase64
                },
                TTL: 60
            }, options)).catch(err => {
                console.log('push error =====>', err);
            })
        }
    }
}
import fetch from 'node-fetch';
import sha1 from 'sha1';
import { wxConfig } from '../../config/sys.config';

let cacheToken = {
        access_token: '',
        expires_in: 0
    }, 
    cacheApiTicket = {
        ticket: '',
        expires_in: 0
    },
    cacheTime = {
        token: 0,
        apiTicket: 0
    };

export default {
    isTokenExpired() {
        return !cacheTime.token || (new Date() - cacheTime.token > cacheToken.expires_in * 1000)
    },

    isJSApiTicketExpired() {
        return !cacheTime.apiTicket || (new Date() - cacheTime.apiTicket > cacheApiTicket.expires_in * 1000)
    },

    /**
     * 获取基本的access_token
     */
    getAccessToken() {
        if (this.isTokenExpired()) {
            cacheTime.token = new Date();            
            let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wxConfig.appID}&secret=${wxConfig.appsecret}`;
            return fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log('============>refresh access_token');
                    if (!data.errcode) {                        
                        data.expires_in -= 60;
                        cacheToken = data;
                        return cacheToken.access_token;
                    }
                });
        } else {
            return Promise.resolve(cacheToken.access_token);
        }
    },

    /**
     * 获取jsapi_ticket
     */
    async getJSApiTicket() {
        let token = await this.getAccessToken();
        if (this.isJSApiTicketExpired()) {
            cacheTime.apiTicket = new Date();            
            let url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`;
            return fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log('============>refresh api_ticket');
                    if (!data.errcode) {                        
                        data.expires_in -= 60;
                        cacheApiTicket = data;
                        return cacheApiTicket.ticket;
                    }
                });
        } else {
            return Promise.resolve(cacheApiTicket.ticket);
        }
    },

    /**
     * 获取随机字符串
     */
    getRandomString() {
        let len = Math.floor(Math.random() * 8 + 8);
        let strs = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomStr = '';
        for (let i = 0, strLen = strs.length; i < len; i++) {
            randomStr += strs.charAt(Math.floor(Math.random() * strLen));
        }
        return randomStr;
    },

    async generateSignature(url) {
        let noncestr = this.getRandomString(),
            timestamp = Date.now(),
            params = [
                `noncestr=${noncestr}`,
                `jsapi_ticket=${await this.getJSApiTicket()}`,
                `timestamp=${timestamp}`,
                `url=${url}`
            ];

        params.sort();
        let signStr = params.join('&');
        return {
            appId: wxConfig.appID,
            timestamp,
            nonceStr: noncestr,
            signature: sha1(signStr),
            url
        };
    },

    // 调用模板消息接口
    async sendMsg(params) {
        let token = await this.getAccessToken();
        return fetch(`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${token}`, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    }
}
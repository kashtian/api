import fetch from 'node-fetch';
import sha1 from 'sha1';

const test = {
    appID: 'wx9c759c88cb47ffa9',
    appsecret: 'bc1fd6c2af0eda0ef87bd6f05aa783c5'
}

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
    getAccessToken(account) {
        if (this.isTokenExpired()) {
            cacheTime.token = new Date();            
            let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${account.appID}&secret=${account.appsecret}`;
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
    async getJSApiTicket(account) {
        let token = await this.getAccessToken(account);
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

    async generateSignature(url, account = test) {
        let noncestr = this.getRandomString(),
            timestamp = Date.now(),
            params = [
                `noncestr=${noncestr}`,
                `jsapi_ticket=${await this.getJSApiTicket(account)}`,
                `timestamp=${timestamp}`,
                `url=${url}`
            ];

        params.sort();
        let signStr = params.join('&');
        return {
            appId: account.appID,
            timestamp,
            nonceStr: noncestr,
            signature: sha1(signStr),
            url
        };
    }
}
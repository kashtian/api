import sha1 from 'sha1';
import log4js from 'log4js';

const log = log4js.getLogger('wx-dev');

const token = 's4fdxrloCHi5u';

export default {
    /**
     * 验证签名
     * @param {Array} params 
     */
    checkSignature(params, signature) {
        if (!Array.isArray(params)) {
            return false;
        }
        log.debug('params: ', params);
        params.push(token);
        params.sort();
        let mySignature = sha1(params.join(''));
        log.debug('it signature: ', signature);
        log.debug('my signature: ', mySignature);
        return mySignature === signature;
    }
}
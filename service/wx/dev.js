import sha1 from 'sha1';

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
        params.push(token);
        params.sort();
        let mySignature = sha1(params.join(''));
        return mySignature === signature;
    }
}
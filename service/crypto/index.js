import crypto from 'crypto';

export default {
    getCurves() {
        let curves = crypto.getCurves();
        console.log('curves: ', curves);
    },

    generateVAPIDKeys() {
        let curve = crypto.createECDH('prime256v1');
        curve.generateKeys();
        let pubKey = curve.getPublicKey(),
            priKey = curve.getPrivateKey()

        let res = {
            publicKey: pubKey,
            privateKey: priKey,
            pubKeyBase64: pubKey.toString('base64'),
            priKeyBase64: priKey.toString('base64')
        }

        console.log('key: ', res);

        return res;
    }
}
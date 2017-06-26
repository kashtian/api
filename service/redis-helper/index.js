import redis from 'redis';
import { redisConfig } from '../../config/sys.config';

const redisClient = redis.createClient(redisConfig);

redisClient.on('error', err => {
    console.log('Redis error: ', err);
});

function getValue(key, isParse) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                let data = (isParse && reply) ? JSON.parse(reply) : reply;
                resolve(data);
            }
        })
    })
}

function setValue(key, data) {
    if (typeof data != 'string') {
        data = JSON.stringify(data);
    }
    redisClient.set(key, data);
}

export default {
    setValue,
    getValue
}

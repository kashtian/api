import should from 'should';
import { cryptoHelper } from '../../service';

describe('crypto test', () => {
    it('get curves', () => {
        cryptoHelper.generateVAPIDKeys();
    })
})


import request from 'supertest';
import should from 'should';

describe('/article route test', () => {  
    let server;

    before(() => {
        process.env.PORT = 3006;
        const app = require('../../index');
        server = request(app);
    })
    
    it('POST /sendTest', done => {
        server.post('/wx/sendTest')
            .set('Accept', 'application/json')
            .expect(200)
            .send({
                touser: 'oeonzwkhFYMiN8pwWhX8y45sKvnk',
                template_id: '0tHeqZRCX-BSY2_s5QOTTAwMIuPTV0okMcYQ6YVj158',
                data: {
                    username: {
                        value: '我母鸡',
                        color: 'red'
                    },
                    message: {
                        value: 'sb',
                        color: '#ccc'
                    }
                }
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                console.log('send template test: ', res.body.data);
                done();
            })
    })

})

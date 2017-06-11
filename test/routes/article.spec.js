import request from 'supertest';
import should from 'should';

describe('/article route test', () => {  
    let server;

    before(() => {
        process.env.PORT = 3006;
        const app = require('../../index');
        server = request(app);
    })
    
    // it('POST /getTypes', done => {
    //     server.post('/article/getTypes')
    //         .set('Accept', 'application/json')
    //         .expect(200)
    //         .end((err, res) => {
    //             if (err) {
    //                 return done(err);
    //             }
    //             console.log('article type list: ', res.body.data);
    //             res.body.code.should.be.equal(200);
    //             done();
    //         })
    // })

    // it('POST /getList', done => {
    //     server.post('/article/getList')
    //         .set('Accept', 'application/json')
    //         .send({
    //             typeID: '14905846153635'
    //         })
    //         .expect(200)
    //         .end((err, res) => {
    //             if (err) {
    //                 return done(err);
    //             }
    //             console.log('article list: ', res.body.data);
    //             res.body.code.should.be.equal(200);
    //             done();
    //         })
    // })

    // it('POST /addPvNum', done => {
    //     server.post('/article/addPvNum')
    //         .set('Accept', 'application/json')
    //         .send({
    //             id: '14932716013271'
    //         })
    //         .expect(200)
    //         .end((err, res) => {
    //             if (err) {
    //                 return done(err);
    //             }
    //             console.log('update pvNum: ', res.body);
    //             res.body.code.should.be.equal(200);
    //             done();
    //         })
    // })

    it('POST /getDetails', done => {
        server.post('/article/getDetails')
            .set('Accept', 'application/json')
            .send({
                id: '14949239822741'
            })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                console.log('article details: ', res.body.data);
                res.body.code.should.be.equal(200);
                done();
            })
    })

    // it('POST /reward', done => {
    //     server.post('/article/reward')
    //         .set('Accept', 'application/json')
    //         .send({
    //             a_id: '14932716013271',
    //             title: 'sdfsdfdf',
    //             author: 'sdf',
    //             release_at: '2017-04-27T07:08:04.000Z',
    //             money: 10
    //         })
    //         .expect(200)
    //         .end((err, res) => {
    //             if (err) {
    //                 return done(err);
    //             }
    //             console.log('reward result: ', res.body);
    //             res.body.code.should.be.equal(200);
    //             done();
    //         })
    // })

    // it('POST /rewardedInfo', done => {
    //     server.post('/article/rewardedInfo')
    //         .set('Accept', 'application/json')
    //         .send({
    //             a_id: '14932716013271'
    //         })
    //         .expect(200)
    //         .end((err, res) => {
    //             if (err) {
    //                 return done(err);
    //             }
    //             console.log('reward info: ', res.body.data);
    //             res.body.code.should.be.equal(200);
    //             done();
    //         })
    // })

    // it('POST /collect', done => {
    //     server.post('/article/collect')
    //         .set('Accept', 'application/json')
    //         .send({
    //             plate_id: '14932716013271',
    //             u_id: '14816832481601'
    //         })
    //         .expect(200)
    //         .end((err, res) => {
    //             if (err) {
    //                 return done(err);
    //             }
    //             console.log('collect result: ', res.body);
    //             res.body.code.should.be.equal(200);
    //             done();
    //         })
    // })

    // it('POST /uncollect', done => {
    //     server.post('/article/uncollect')
    //         .set('Accept', 'application/json')
    //         .send({
    //             plate_id: '14933449704071',
    //             u_id: '10010'
    //         })
    //         .expect(200)
    //         .end((err, res) => {
    //             if (err) {
    //                 return done(err);
    //             }
    //             console.log('uncollect result: ', res.body);
    //             res.body.code.should.be.equal(200);
    //             done();
    //         })
    // })

    // it('POST /isCollected', done => {
    //     server.post('/article/isCollected')
    //         .set('Accept', 'application/json')
    //         .send({
    //             plate_id: '14932716013271',
    //             u_id: '14816832481601'
    //         })
    //         .expect(200)
    //         .end((err, res) => {
    //             if (err) {
    //                 return done(err);
    //             }
    //             console.log('isCollected: ', res.body.data);
    //             res.body.code.should.be.equal(200);
    //             done();
    //         })
    // })

    
    // it('POST /search', done => {
    //     server.post('/article/search')
    //         .set('Accept', 'application/json')
    //         .send({
    //             keyword: 'df'
    //         })
    //         .expect(200)
    //         .end((err, res) => {
    //             if (err) {
    //                 return done(err);
    //             }
    //             console.log('search: ', res.body);
    //             res.body.code.should.be.equal(200);
    //             done();
    //         })
    // })

    // it('POST /searchResult', done => {
    //     server.post('/article/searchResult')
    //         .set('Accept', 'application/json')
    //         .send({
    //             keyword: 'df'
    //         })
    //         .expect(200)
    //         .end((err, res) => {
    //             if (err) {
    //                 return done(err);
    //             }
    //             console.log('searchResult: ', res.body);
    //             res.body.code.should.be.equal(200);
    //             done();
    //         })
    // })

    // it('POST /searchSingle', done => {
    //     server.post('/article/searchSingle')
    //         .set('Accept', 'application/json')
    //         .send({
    //             id: 14949045715831
    //         })
    //         .expect(200)
    //         .end((err, res) => {
    //             if (err) {
    //                 return done(err);
    //             }
    //             console.log('search single: ', res.body);
    //             res.body.code.should.be.equal(200);
    //             done();
    //         })
    // })

    //  it('POST /addOrder', done => {
    //     server.post('/article/addOrder')
    //         .set('Accept', 'application/json')
    //         .send({
    //             plate_id: 14933449704071,
    //             u_id: 14841047972301,
    //             money: 20
    //         })
    //         .expect(200)
    //         .end((err, res) => {
    //             if (err) {
    //                 return done(err);
    //             }
    //             console.log('add order: ', res.body);
    //             res.body.code.should.be.equal(200);
    //             done();
    //         })
    // })

    // it('POST /setOrderStatus', done => {
    //     server.post('/article/setOrderStatus')
    //         .set('Accept', 'application/json')
    //         .send({
    //             id: 14944950842293,
    //             status: 1
    //         })
    //         .expect(200)
    //         .end((err, res) => {
    //             if (err) {
    //                 return done(err);
    //             }
    //             console.log('update article order status: ', res.body);
    //             res.body.code.should.be.equal(200);
    //             done();
    //         })
    // })

    // it('POST /getHotList', done => {
    //     server.post('/article/getHotList')
    //         .set('Accept', 'application/json')
    //         .send()
    //         .expect(200)
    //         .end((err, res) => {
    //             if (err) {
    //                 return done(err);
    //             }
    //             console.log('article hot list: ', res.body.data);
    //             res.body.code.should.be.equal(200);
    //             done();
    //         })
    // })

})

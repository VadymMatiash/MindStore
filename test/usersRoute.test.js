// const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');
const User = require('../models/User');
// const db = require('../config/keys').mongoURI;

chai.use(chaiHttp);
const expect = chai.expect;

describe('/POST register', () => {
    it('should POST new user and return it', (done) => {
        let data = {
            name: 'test1', 
            email: 'test1@test.com',
            password: '1234567',
            password2: '1234567'
        };
        User.findOneAndDelete({email: data.email}, () => {});
        chai.request(server)
            .post('/api/users/register')
            .send(data)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });
    it('shouldn\'t POST new user', (done) => {
        let data = {
            name: 'test1', 
            email: 'test1@test.com',
            password: '1234567',
            password2: '1234567'
        };
        chai.request(server)
            .post('/api/users/register')
            .send(data)
            .end((err, res) => {
                expect(res.status).to.equal(400);
                done();
            });
    });
});
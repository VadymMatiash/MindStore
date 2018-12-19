// const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');
const User = require('../models/User');
// const db = require('../config/keys').mongoURI;

let token;

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

describe('/POST login', () => {
    it('should return error user not found', (done)=>{
        chai.request(server)
            .post('/api/users/login')
            .send({email: 'test111@gmail.com', password: '1234567'})
            .end((err, res) => {
                expect(JSON.parse(res.error.text).email).to.equal('User not found');
                done();
            });
    });

    it('should return error user not found', (done)=>{
        chai.request(server)
            .post('/api/users/login')
            .send({email: 'test1@test.com', password: '123456789'})
            .end((err, res) => {
                expect(JSON.parse(res.error.text).password).to.equal('Password incorrect');
                done();
            });
    });

    it('should login correctly', (done)=> {
        chai.request(server)
            .post('/api/users/login')
            .send({email: 'test1@test.com', password: '1234567'})
            .end((err, res) => {
                expect(res.status).to.equal(200);
                token = res.body.token;
                done();
            });
    });
});

describe('/GET current', ()=> {
    it('shoudn\'t autorise wihtout token', (done)=>{
        chai.request(server)
            .get('/api/users/current')
            .end((err, res) =>{
                expect(res.status).to.equal(401);
                done();
            });
    });

    it('should autorise with token', (done)=>{
        chai.request(server)
            .get('/api/users/current')
            .set('Authorization', token)
            .end((err, res) =>{
                expect(res.status).to.equal(200);
                done();
            });
    });
});
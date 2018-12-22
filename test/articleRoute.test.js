const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');
const Article = require('../models/Article');

const getToken = require('./usersRoute.test');
let token;

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST article', () => {
    
    let data = {
        title: 'Test title',
        text: 'lorem ippsum',
        tests: [
            {
                question: 'dsf',
                answers: ['sdf', 'sdf'],
                type: 'radio',
                correctAnswers: ['sdf']
            },
            {
                question: 'dsf',
                answers: ['sdf', 'sdf'],
                type: 'radio',
                correctAnswers: ['sdf']
            }
        ]
    };

    it('should post data', (done) => {

        token = getToken();

        chai.request(server)
            .post('/api/articles/')
            .set('Authorization', token)
            .send(data)
            .end((err,res) =>{
                Article.findByIdAndDelete(JSON.parse(res.text)._id);
                expect(res.status).to.equal(200);
                done();
            });
    });

    it('should check test', (done) => {
        let data1 ={
            answers: [
                {
                    _id: '5c1e573864aae5302c82dc0e',
                    correctAnswers: ['sdf']
                },
                {
                    _id: '5c1e573864aae5302c82dc0d',
                    correctAnswers: ['sdf']
                }
            ]
        }; 

        chai.request(server)
            .post('/api/articles/5c1e573864aae5302c82dc0c')
            .set('Authorization', token)
            .send(data1)
            .end((err,res) =>{
                console.log(res.text);
                expect(res.status).to.equal(200);
                //console.log(err);
                done();
            });
    });
});
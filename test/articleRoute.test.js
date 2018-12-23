const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');
const Article = require('../models/Article');

const getToken = require('./usersRoute.test');
let token;
let id = [];

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET article', ()=> {
    it('should return articles', ()=>{
        chai.request(server)
            .get('/api/articles')
            .end((err,res) => {
                expect(res.status).to.equal(200);
                expect(+JSON.parse(res.text).length).not.equal(0);
            });
    });
});

describe('POST article', () => { 
    
    let data = {
        title: 'Test title',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium velit ab sint porro, nostrum qui sed soluta animi, eveniet mollitia voluptatibus unde earum. Reprehenderit labore quaerat dolorum similique sint! Reiciendis obcaecati quibusdam, vel ratione aliquam, consequatur distinctio dolores minus hic nemo quos officia, laboriosam voluptas excepturi veritatis vero voluptatibus tempora fuga cumque. Repellendus, repudiandae rerum quae in vel qui corrupti blanditiis dolores explicabo ut, eius sunt assumenda sequi ipsa officia nobis eaque! Quod cum similique assumenda ullam cumque recusandae commodi explicabo doloribus iste! Rerum possimus alias doloremque doloribus. Quidem repellendus modi totam impedit dicta suscipit, labore saepe assumenda, perspiciatis porro dolor architecto?',
        tests: [
            {
                question: 'dsf',
                answers: ['sdf', 'sdf1'],
                type: 'radio',
                correctAnswers: ['sdf']
            },
            {
                question: 'dsf1',
                answers: ['sdf', 'sdf1'],
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
                id.push(JSON.parse(res.text)._id);
                id.push(JSON.parse(res.text).tests[0]._id);
                id.push(JSON.parse(res.text).tests[1]._id);
                expect(res.status).to.equal(200);
                done();
            });
    });

    
});

describe('GET:id article', () => {
    it('should return error with notfound article', ()=>{
        chai.request(server)
            .get('/api/articles/3')
            .end((err,res) => {
                expect(res.status).to.equal(404);
                expect(JSON.parse(res.text).noarticlefound).to.equal('No article found with that ID');
            });
    });

    it('should return article', ()=> {
        chai.request(server)
            .get('/api/articles/'+id[0])
            .end((err,res) => {
                expect(res.status).to.equal(200);
                expect(typeof JSON.parse(res.text)).to.equal('object');
            });
    });
});

describe('POST:id article', () => {
    it('should check test', (done) => {
        let data1 ={
            answers: [
                {
                    _id: id[1],
                    correctAnswers: ['sdf']
                },
                {
                    _id: id[2],
                    correctAnswers: ['sdf']
                }
            ]
        }; 

        chai.request(server)
            .post('/api/articles/'+id[0])
            .set('Authorization', token)
            .send(data1)
            .end((err,res) =>{
                expect(res.status).to.equal(200);
                //console.log(res.text);
                Article.findByIdAndDelete(id[0]).then(() => {
                    
                });
                done();
            });
    }); 
});


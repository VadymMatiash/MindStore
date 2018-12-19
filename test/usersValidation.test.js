const chai = require('chai');
const expect = chai.expect;

const isEmpty = require('../validation/isEmpty');
const validateRegisterInput  = require('../validation/register');
const validateLoginInput  = require('../validation/login');

//Test isEmpty module
describe('isEmpty function test', () => {
    let obj = {};
    it('should return false getting number',()=>{
        expect(isEmpty(3)).to.be.false;
    });
    it('should return false getting not empty string',()=>{
        expect(isEmpty('test')).to.be.false;
    });
    it('should return true getting underfined',()=>{
        expect(isEmpty(undefined)).to.be.true;
    });
    it('should return true getting null',()=>{
        expect(isEmpty(null)).to.be.true;
    });
    it('should return true getting string with spaces',()=>{
        expect(isEmpty('   ')).to.be.true;
    });
    it('should return true getting empty object',()=>{
        expect(isEmpty(obj)).to.be.true;
    });
});

//Test validateRegisterInput module
describe('validateRegisterInput function test', () => {
    let trueObj = {
        name: 'test1', 
        email: 'test1@test.com',
        password: '1234567',
        password2: '1234567'
    };
    it('shouldn\'t return errors', ()=>{
        expect(validateRegisterInput(trueObj).isValid).to.be.true;
    });
    let falseOjb = {
        name: 't', 
        email: 'test1@test.com',
        password: '1234567',
        password2: '1234567'
    };
    it('should have error with name size', ()=>{
        expect(validateRegisterInput(falseOjb).errors.name).to.equal('Name must be between 2 and 25 characters');
    });
    let falseOjb1 = {
        name: '', 
        email: '',
        password: '1234567',
        password2: '1234567'
    };
    it('should have error with name require', ()=>{
        expect(validateRegisterInput(falseOjb1).errors.name).to.equal('Name field is required');
    });
    it('should have error with email require', ()=>{
        expect(validateRegisterInput(falseOjb1).errors.email).to.equal('Email field is required');
    });
    let falseOjb2 = {
        name: '', 
        email: 'esf',
        password: '1234',
        password2: ''
    };
    it('should have error with invalid email', ()=>{
        expect(validateRegisterInput(falseOjb2).errors.email).to.equal('Email is invalid');
    });
    it('should have error with password size', ()=>{
        expect(validateRegisterInput(falseOjb2).errors.password).to.equal('Password must be at least 6 characters');
    });
    let falseOjb3 = {
        name: '', 
        email: 'esf',
        password: '',
        password2: ''
    };
    it('should have error with password require', ()=>{
        expect(validateRegisterInput(falseOjb3).errors.password).to.equal('Password field is required');
    });
    it('should have error with password2 mismatch', ()=>{
        expect(validateRegisterInput(falseOjb2).errors.password2).to.equal('Passwords must match');
    });
    
});

//Test validateLoginInput function
describe('validateRegisterInput function test', () => {
    let correctData = {
        email: 'test@test.com',
        password: '1234567'
    };
    
    it('should be valid', ()=>{
        expect(validateLoginInput(correctData).isValid).to.be.true;
    });

    it('should return error with invalid email', ()=>{
        expect(validateLoginInput({email: 'testtest', password: '1234567'}).errors.email).to.equal('Email is invalid');
    });

    it('should return error with password field required', ()=>{
        expect(validateLoginInput({email: 'test@test.com', password: ''}).errors.password).to.equal('Password field is required');
    });

});
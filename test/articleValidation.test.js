const chai = require('chai');
const expect = chai.expect;

const validateArticleInput  = require('../validation/article');

//Test article input validation
describe('validateArticleInput function test', ()=>{
    let obj = {
        title: '',
        text: '',
        tags: ['d', 'jd', '123456789ABCDEF'],
    };
    let obj2 = {
        title: 'Te',
        text: 'dsfhosehf'
    };
    let trueObj = {
        title: 'test this',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus repellendus alias sunt sequi sed expedita! Dolorem magnam quam neque et? Similique pariatur sequi vitae asperiores odit voluptatibus, odio tenetur voluptas vel non voluptatem, voluptate incidunt enim cupiditate dolor? Et possimus id maiores perferendis qui, dolorem recusandae labore ipsa vitae dignissimos deserunt optio provident odio eaque molestias quae. In illo minus modi, blanditiis omnis deleniti quidem eligendi placeat nostrum dolorum esse. Dolor perspiciatis ullam quos nam alias deleniti optio nostrum accusamus at quis quidem nisi provident quibusdam soluta nihil, error facere quas eligendi sunt, quia saepe porro reiciendis! Aliquam autem quo distinctio veniam!'
    };
    it('should return error with title field require', () => {
        expect(validateArticleInput(obj).errors.title).to.equal('Title field is required');
    });
    it('should return error with title size', () => {
        expect(validateArticleInput(obj2).errors.title).to.equal('Title must have between 3 and 40 characters');
    });
    it('should return error with text field require', () => {
        expect(validateArticleInput(obj).errors.text).to.equal('Text field is required');
    });
    it('should return error with text size', () => {
        expect(validateArticleInput(obj2).errors.text).to.equal('Text must have at lest 100 characters');
    });
    it('should return error with tag size', () => {
        expect(validateArticleInput(obj).errors.tags).to.equal('Tag must have between 3 and 15 characters');
    });
    it('shouldn\'t return errors', ()=>{
        expect(validateArticleInput(trueObj).isValid).to.be.true;
    });
});
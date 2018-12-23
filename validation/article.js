const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateArticleInput(data){
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.text = !isEmpty(data.text) ? data.text: '';
    data.tags = !isEmpty(data.tags) ? data.tags: [];


    if(!Validator.isLength(data.title, {min: 3, max: 40})){
        errors.title = 'Title must have between 3 and 40 characters';
    }

    if(Validator.isEmpty(data.title)){
        errors.title = 'Title field is required';
    }

    if(!Validator.isLength(data.text, {min: 100, max: undefined})){
        errors.text= 'Text must have at lest 100 characters';
    }

    if(Validator.isEmpty(data.text)){
        errors.text = 'Text field is required';
    }

    if(data.tags.length !== 0){
        let arr = data.tags.filter(item => {
            if(!Validator.isLength(item, {min: 3, max: 15})){
                return true;
            }
            return false;
        });
        if(arr.length > 0){
            errors.tags = 'Tag must have between 3 and 15 characters';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
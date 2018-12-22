const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    date:{
        type: Date,
        default: Date.now
    },
    tags:{
        type: [String],
        required: false
    },
    text:{
        type: String,
        required: true
    },
    tests:[
        {
            question: {
                type: String,
                required: true
            },
            answers: {
                type: [String],
                required: true
            },
            type: {
                type: String,
                required: true
            },
            correctAnswers:{
                type: [String],
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('articles', ArticleSchema);
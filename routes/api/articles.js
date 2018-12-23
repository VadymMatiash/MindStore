const express = require('express');
const router = express.Router();
const passport = require('passport');

const Article = require('../../models/Article');
const validateArticleInput = require('../../validation/article');

// @route   GET api/articles/
// @desc    Return list of articles
// @access  Public
router.get('/', (req, res)=> {
    Article.find().sort({date: -1})
        .then(articles => {
            articles.map(item => {
                item.tests.map(test => {
                    test.correctAnswers = null;
                });
            });
            res.json(articles);
        })
        .catch(() => res.status(404).json({noarticlefound: 'No articles found'}));
});


// @route   GET api/articles/:id
// @desc    Return article by id
// @access  Public
router.get('/:id', (req, res) => {
    Article.findById(req.params.id)
        .then(article => {
            article.tests.map(item => {
                item.correctAnswers = null;
            });
            res.json(article);
        })
        .catch(() => 
            res.status(404).json({noarticlefound: 'No article found with that ID'}));
});



// @route   POST api/articles/
// @desc    Create article
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateArticleInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newArticle = new Article({
        title: req.body.title,
        user: req.user.id,
        text: req.body.text,
        tags: req.body.tags,
        tests: req.body.tests
    });

    newArticle.save().then(article => res.json(article));
});

router.post('/:id', passport.authenticate('jwt', { session: false }), (req, res) =>{
    let score = 0;

    let answers1 = req.body.answers.map(item => item);

    Article.findById(req.params.id)
        .then(answers => {
            let testss = answers.tests.map(item => item);

            let correctAnswers = testss.map(item => ({_id: item.id, correctAnswers: item.correctAnswers}));
            
            for(let i=0; i< answers1.length; i++){
                if(JSON.stringify(answers1[i]) === JSON.stringify(correctAnswers[i])){
                    score++;
                }
            }

            res.json({score, correctAnswers});
        });
});



module.exports =router;
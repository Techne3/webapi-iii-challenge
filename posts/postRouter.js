const express = require('express');
const router = express.Router();

const db = require('./postDb')


router.get('/', (req, res) => {
    db.get()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({message: 'error retrieving post'})
    })
});

router.get('/:id',validatePostId, (req, res) => {
    const id = req.params.id

    db.getById(id)
    .then(postId => {
        if(postId) {
            res.status(200).json(postId)
        }
    })
    .catch(err => {
        res.status(500).json({error: 'post with specified id not found'})
    })
});

router.delete('/:id',validatePostId, (req, res) => {
    const id = req.params.id
    db.getById(id)
    .then(posts =>{
        db.remove(id)
        .then(posts=>{
            res.status(200).json(posts)
        })
    })
    .catch(err => {
        res.status(500).json({error: 'error deleting specified id'})
    })
});

router.put('/:id', validatePostId,(req, res) => {
    const id = req.params.id
    const newText = req.body
    db.update(id, newText)
    .then(text => {
        res.status(200).json(text);
    })
    .catch(err => {
        console.log("Error!", err);
        res.status(500).json({ error: "server error: post update failed"});
    });
});

// custom middleware

function validatePostId(req, res, next) {
    const id = req.params.id

    db.getById(id)
   .then(user => {
     if(user){
         next();
     }else{
       res.status(400).json({message: 'invalid user id'});
     }
   })
};

module.exports = router;
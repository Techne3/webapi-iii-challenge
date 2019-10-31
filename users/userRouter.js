const express = require('express');
const usersDB = require('./userDb');
const postsDB = require('../posts/postDb')


const router = express.Router();


router.post('/',validateUser, (req, res) => {
    const userInfo = req.body

    usersDB.insert(userInfo)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            errorMessage: "There was an error getting the user"
        })
    })
});


router.post('/:id/posts',validateUserId,validatePost, (req, res) => {
    const id = req.params.id
    const poster = {...req.body, user_id: id}
    postsDB.insert(poster)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => res.status(500).json({error: 'user insert failed'}))
    
});




router.get('/', (req, res) => {
    usersDB.get()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            errorMessage: "Error retrieving users."
        })
    })
});	



router.get('/:id',validateUserId, (req, res) => {

    const id = req.params.id

    usersDB.getById(id)
    .then(userID => {
        if(userID){
            res.status(201).json(userID)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: ''})
    })
});



router.get('/:id/posts',validateUserId, (req, res) => {
    const id = req.params.id
    usersDB.getUserPosts(id)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({error: 'server error: getUserPost failed'})
    })

});

router.delete('/:id',validateUserId, (req, res) => {
    const id = req.params.id
    usersDB.getById(id)
    .then(user => {
        usersDB.remove(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({error:  'user remove failed'})
        })
    })

});

router.put('/:id',validateUserId, validateUser, (req, res) => {
    const id = req.params.id;
    const newPost = req.body;

    usersDB.update(id, newPost)
    .then(count => {
        res.status(200).json(count);
    })
    .catch(err => {
        console.log("Error!", err);
        res.status(500).json({ error: "server error: user update failed"});
    });

});

//custom middleware

function validateUserId(req, res, next) {

    const id = req.params.id;	   

     usersDB.getById(id)
    .then(user => {
      if(user){
          next();
      }else{
        res.status(400).json({message: 'invalid user id'});
      }
    })
};


function validateUser(req, res, next) {

     const user = req.body
     if(!Object.entries(user).length){
         res.status(400).json({message: 'missing user data'})
     }
    if(!user.name){
        res.status(400).json({message: 'missing required name field'})
    }
    next()
};


function validatePost(req, res, next) {
    const post = req.body
    if(!Object.entries(post).length){
        res.status(400).json({message: 'missing post data'})
    }else if(!post.text){
        res.status(400).json({message: 'missing text field'})
    }else{
    
    next();
    }
};

module.exports = router;

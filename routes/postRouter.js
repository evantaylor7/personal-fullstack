const express = require('express')
const postRouter = express.Router()
const Post = require('../models/post.js')

// get blog posts by user
postRouter.get('/user', (req, res, next) => {
    Post.find(
        {user: req.user._id}, 
        (err, posts) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(posts)
    })
})

// get one blog post
postRouter.get('/:postId', (req, res, next) => {
    Post.findOne(
        {_id: req.params.postId}, 
        (err, post) => {
            if(err){
                res.status(500)
                return next(err)
            }
        return res.status(200).send(post)
    })
})

module.exports = postRouter
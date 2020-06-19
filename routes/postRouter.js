const express = require('express')
const postRouter = express.Router()
const Post = require('../models/post.js')

// get blog posts by user's blogId
postRouter.get('/:blogId', (req, res, next) => {
    Post.find(
        {blog: req.params.blogId}, 
        (err, posts) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(posts)
    })
})

// get one blog post
postRouter.get('/detail/:postId', (req, res, next) => {
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
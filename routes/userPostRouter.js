const express = require('express')
const userPostRouter = express.Router()
const Post = require('../models/post.js')

// new blog post
userPostRouter.post('/post', (req, res, next) => {
    req.body.user = req.user._id
    req.body.postedBy = req.user.username
    const newPost = new Post(req.body)
    newPost.save((err, post) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(post)
    })
})

// delete a blog post
userPostRouter.delete('/:postId', (req, res, next) => {
    Post.findOneAndDelete(
        {_id: req.params.postId, user: req.user._id},
        (err, deletedPost) => {
            if(err){
                res.status(500)
                return next(err)
            }
        return res.status(200).send(`Your issue \"${deletedPost.title}\" was successfully deleted.`)
    })
})

// update a blog post
userPostRouter.put('/:postId', (req, res, next) => {
    Post.findOneAndUpdate(
        {_id: req.params.postId, user: req.user._id},
        req.body,
        {new: true},
        (err, updatedPost) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedPost)
        }
    )
})

module.exports = userPostRouter
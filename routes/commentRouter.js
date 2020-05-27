const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment.js')
const User = require('../models/user.js')

// get comments by post
commentRouter.get('/:postId', (req, res, next) => {
    Comment.find(
        {post: req.params.postId}, 
        (err, comments) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(comments)
    })
})

// post comment
commentRouter.post('/:postId', async (req, res, next) => {
    // req.body.user = req.user._id
    // req.body.postedBy = req.user.username
    req.body.post = req.params.postId
    try {
        const user = await User.findOne({_id: req.user._id})
        if(user){
            req.body.postedBy = user.username
            req.body.user = user._id
        }
        const newComment = new Comment(req.body)
        const newCommentObj = await new newComment.save()
        return res.status(201).send(newCommentObj)
    }
    catch(err){
        res.status(500)
        return next(err)
    }
})
// ^^ need to make sure this works

module.exports = commentRouter
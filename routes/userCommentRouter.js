const express = require('express')
const userCommentRouter = express.Router()
const Comment = require('../models/comment.js')

// delete a comment (by post's user)
commentRouter.delete('/:commentId', (req, res, next) => {
    Comment.findOneAndDelete(
        {_id: req.params.commentId, user: req.user._id},
        (err, deletedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
        return res.status(200).send('Comment deleted')
    })
})

// edit comment
commentRouter.put('/:commentId', (req, res, next) => {
    Comment.findOneAndUpdate(
        {_id: req.params.commentId, user: req.user._id},
        req.body,
        {new: true},
        (err, editedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(editedComment)
        }
    )
})

module.exports = userCommentRouter
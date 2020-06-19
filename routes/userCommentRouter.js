const express = require('express')
const userCommentRouter = express.Router()
const Comment = require('../models/comment.js')

const createDate = () => {
    const month = new Date().toLocaleString('default', { month: 'long' })
    const dateArr = Date().split(' ')
    return `${month} ${dateArr[2]}, ${dateArr[3]}`
}

// post comment (if user)
userCommentRouter.post('/:postId', (req, res, next) => {
    req.body.post = req.params.postId
    req.body.postedBy = req.user.username
    req.body.user = req.user._id
    req.body.date = createDate()
    const newComment = new Comment(req.body)
    newComment.save((err, newComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newComment)
    })
})

// delete a comment (by post's user)
userCommentRouter.delete('/:commentId', (req, res, next) => {
    Comment.findOneAndDelete(
        {_id: req.params.commentId},
        (err, deletedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
        return res.status(200).send('Comment deleted')
    })
})
// ^^ could also change this to look for user of comment || user of post

// edit comment
userCommentRouter.put('/:commentId', (req, res, next) => {
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
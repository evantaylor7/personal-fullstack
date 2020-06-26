const express = require('express')
const userPostRouter = express.Router()
const Post = require('../models/post.js')

const createDate = () => {
    const month = new Date().toLocaleString('default', { month: 'long' })
    const dateArr = Date().split(' ')
    return `${month} ${dateArr[2]}, ${dateArr[3]}`
}

// get posts (logged in user)
userPostRouter.get('/:blogId', (req, res, next) => {
    Post.find(
        {blog: req.params.blogId},
        (err, posts) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(posts)
        }
    )
})

// new blog post
userPostRouter.post('/', (req, res, next) => {
    req.body.date = createDate()
    req.body.user = req.user._id
    req.body.postedBy = req.user.username
    const newPost = new Post(req.body)
    newPost.save((err, newPost) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newPost)
    })
})

// edit a blog post
userPostRouter.put('/update-one/:postId', (req, res, next) => {
    req.body.date = createDate()
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

// add unsplash image
userPostRouter.put('/add-img/', (req, res, next) => {
    console.log(req.body)
    Post.findOneAndUpdate(
        {_id: req.body.postId, user: req.user._id},
        {titleImg: req.body.titleImg},
        {upsert: true, new: true},
        (err, updatedPost) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedPost)
        }
    )
})

// update multiple posts
userPostRouter.put('/update-collection', (req, res, next) => {
    Post.updateMany(
        {user: req.user._id},
        req.body,
        (err, report) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(report)
        }
    )
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

module.exports = userPostRouter
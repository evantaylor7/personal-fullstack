const express = require('express')
const userBlogRouter = express.Router()
const Blog = require('../models/blog.js')

// create blog
userBlogRouter.post('/', (req, res, next) => {
    req.body.user = req.user._id
    req.body.authorName = req.user.username
    req.body.username = req.user.username
    req.body.blogUrl = `${req.user.username}sBlog`
    req.body.title = {content: `${req.user.username}'s Blog`, color: '#1d1d1d'}
    const newBlog = new Blog(req.body)
    newBlog.save((err, newBlog) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newBlog)
    })
})

// get blog
userBlogRouter.get('/', (req, res, next) => {
    Blog.findOne(
        {user: req.user._id},
        (err, blog) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(blog)
        }
    )
})

// check blog url endpoints
userBlogRouter.get('/check/:endpoint', async (req, res, next) => {
    try {
        const existingUrl = await Blog.findOne({blogUrl: req.params.endpoint})
        if(existingUrl) {
            return res.status(200).send(true)
        } else {
            return res.status(200).send(false)
        }
    }
    catch(err){
        res.status(500)
        return next(err)
    }
})

// update blog
userBlogRouter.put('/', (req, res, next) => {
    req.body.user = req.user._id
    req.body.username = req.user.username
    Blog.findOneAndUpdate(
        {user: req.body.user},
        req.body,
        {new: true},
        (err, blog) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(blog)
        }
    )
})

module.exports = userBlogRouter
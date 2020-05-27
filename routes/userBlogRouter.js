const express = require('express')
const userBlogRouter = express.Router()
const Blog = require('../models/blog.js')

// update blog
userBlogRouter.put('/', (req, res, next) => {
    req.body.user = req.user._id
    req.body.username = req.user.username
    Blog.updateOne(
        {user: req.body.user},
        req.body,
        {upsert: true, new: true},
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
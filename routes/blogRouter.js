const express = require('express')
const blogRouter = express.Router()
const Blog = require('../models/blog.js')

// get one user's blog
blogRouter.get('/:endpoint', (req, res, next) => {
    Blog.findOne(
        {blogUrl: req.params.endpoint},
        (err, blog) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(blog)
        }
    )
})

// get one blog using blogId
blogRouter.get('/id/:blogId', (req, res, next) => {
    Blog.findOne(
        {_id: req.params.blogId},
        (err, blog) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(blog)
        }
    )
})

module.exports = blogRouter
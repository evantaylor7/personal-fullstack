const express = require('express')
const userBlogRouter = express.Router()
const Blog = require('../models/blog.js')
const multer = require('multer')
// const upload = multer({dest: 'uploads/'})

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
        const existingUrl = await Blog.findOne({url: req.params.endpoint})
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
    // console.log(req.file)
    req.body.user = req.user._id
    req.body.username = req.user.username
    req.body.img = req.file
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

// const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

module.exports = userBlogRouter
const express = require('express')
const userImageRouter = express.Router()
const Blog = require('../models/blog.js')
const Profile = require('../models/profile.js')
const Post = require('../models/post.js')
const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}-${Date.now()}`)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' || file.mimetype === 'image/tiff'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    },
    fileFilter: fileFilter,
    onError: function(err, next){
        if(err){
            res.status(500)
            return next(err)
        }
    }
})

// BLOG (main image):

userImageRouter.put('/blog/:blogId', upload.single('imageData'), (req, res, next) => {
    Blog.findOneAndUpdate(
        {_id: req.params.blogId},
        {img: req.file.path},
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

// PROFILE:

userImageRouter.put('/profile/:blogId', upload.single('imageData'), (req, res, next) => {
    req.body.user = req.user._id
    req.body.blog = req.params.blogId
    req.body.img = req.file.path
    Profile.findOneAndUpdate(
        {blog: req.params.blogId},
        req.body,
        {upsert: true, new: true},
        (err, profile) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(profile)
        }
    )
})

// POST:

// add title image (update existing post)
userImageRouter.put('/title-image/:postId', upload.single('imageData'), (req, res, next) => {
    req.body.img = `http://localhost:3000/${req.file.path}`
    // *** needs to be changed for deployment ***
    if(!req.params.postId){
        req.body.postId === ''
    }
    Post.findOneAndUpdate(
        {_id: req.params.postId},
        {titleImg: req.body.img},
        {new: true},
        (err, post) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(post)
        }
    )
})

// add preview image
userImageRouter.put('/post-preview/:postId', upload.single('imageData'), (req, res, next) => {
    Post.findOneAndUpdate(
        {_id: req.params.postId},
        {previewImg: req.file.path},
        {new: true},
        (err, post) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(post)
        }
    )
})

// add post content image
userImageRouter.put('/post/:postId', upload.single('imageData'), (req, res, next) => {
    Post.findOneAndUpdate(
        {_id: req.params.postId},
        {$push: {contentImgs: req.file.path}},
        {new: true},
        (err, post) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(post)
        }
    )
})

// delete an image file
userImageRouter.delete(`/uploads/:imgPath`, (req, res, next) => {
    Post.updateOne(
        {id: req.body.postId},
        {$pull: {contentImgs: `uploads/${req.params.imgPath}`}},
        (err, post) => {
            if(err){
                res.status(404)
                return next(err)
            }
            console.log('Successfully deleted image path from array')
        }
    )
    fs.unlink(`./uploads/${req.params.imgPath}`, err => {
        if(err){
            res.status(500)
            return next(('Failed to delete local image file:' + err))
        } else {
            res.status(200).send('Successfully deleted local image file')
        }
    })
})

module.exports = userImageRouter
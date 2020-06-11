const express = require('express')
const userImageRouter = express.Router()
const Blog = require('../models/blog.js')
const Profile = require('../models/profile.js')
const Post = require('../models/post.js')
const multer = require('multer')

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
        fileSize: 12000000
    },
    fileFilter: fileFilter
})

userImageRouter.put('/blog/:blogId', upload.single('imageData'), (req, res, next) => {
        // if(err instanceof multer.MulterError){
        //     res.status(500)
        //     return next(err)
        // } else if(err) {
        //     res.status(500)
        //     return next(Error('An error occured'))
        // }      
    console.log(req.file)
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

userImageRouter.put('/posts/:postId', upload.single('imageData'), (req, res, next) => {
    Post.findOneAndUpdate(
        {_id: req.params.postId},
        {$push: {img: req.file.path}},
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

// userImageRouter.get('/:blogId', (req, res, next) => {
//     Image.find(
//         {blog: req.params.blogId},
//         (err, image) => {
//             if(err){
//                 res.status(500)
//                 return next(err)
//             }
//             return res.status(200).send(image)
//         }
//     )
// })

module.exports = userImageRouter
const express = require('express')
const userImageRouter = express.Router()
// const Image = require('../models/image.js')
const Blog = require('../models/blog.js')
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

userImageRouter.put('/:blogId', upload.single('imageData'), (req, res, next) => {
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

userImageRouter.get('/:blogId', (req, res, next) => {
    Image.find(
        {blog: req.params.blogId},
        (err, image) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(image)
        }
    )
})

module.exports = userImageRouter
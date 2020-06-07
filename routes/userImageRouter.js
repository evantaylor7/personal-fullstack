const express = require('express')
const userImageRouter = express.Router()
const Image = require('../models/image.js')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}
// can change this

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
        // may have to change this
    },
    fileFilter: fileFilter
})

userImageRouter.route('/:blogId')
// maybe can change this?
    .post(upload.single('imageData'), (req, res, next) => {
        console.log(req.body)
        const newImage = new Image({
            imageName: req.body.imageName,
            imageData: req.file.path,
            blog: req.params.blogId
        })

        newImage.save()
            .then(result => {
                console.log(result)
                res.status(201).json({
                    success: true,
                    document: result
                })
            })
            .catch(err => next(err))
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
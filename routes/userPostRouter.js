const express = require('express')
const userPostRouter = express.Router()
const aws = require('aws-sdk')
const Post = require('../models/post.js')
// const fs = require('fs')

aws.config.region = 'us-east-1'
const s3 = new aws.S3()
const bucket = process.env.S3_BUCKET_NAME

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
    let dest
    if(req.body.titleImg){
        dest = 'titleImg'
    } else {
        dest = 'previewImg'
    }
    Post.findOneAndUpdate(
        {_id: req.body.postId, user: req.user._id},
        {[dest]: req.body[dest]},
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
userPostRouter.delete('/:postId', async (req, res, next) => {
    try{
        const post = await Post.findOne({_id: req.params.postId})
        if(post){
            const postImgs = post.contentImgs
            if(postImgs){
                const params = {
                    Bucket: bucket,
                    Delete: {
                        Objects: []
                    }
                }
                for(let i = 0; i < postImgs.length; i++){
                    params.Delete.Objects.push({Key: postImgs[i].replace('https://blogtopiabucket.s3.amazonaws.com/', '')})

                    // previous function to delete from local ./uploads folder --> 

                    // fs.unlink(`./${postImgs[i]}`, err => {
                    //     if(err){
                    //         console.log('Failed to delete local image file:' + err)
                    //     } else {
                    //         console.log('Successfully deleted local file')
                    //     }
                    // })
                    
                }
                s3.deleteObjects(params, (err, data) => {
                    if(err){
                        res.status(500)
                        return next(err)
                    }
                    console.log(data)
                })
            }
        }
        await Post.findOneAndDelete({_id: req.params.postId, user: req.user._id})
        return res.status(200).send(`Your post was successfully deleted.`)
    }
    catch(err){
        res.status(500)
        return next(err)
    }
})

module.exports = userPostRouter
const express = require('express')
const userProfileRouter = express.Router()
const Profile = require('../models/profile.js')

// get profile (logged in user)
userProfileRouter.get('/', (req, res, next) => {
    Profile.findOne(
        {user: req.user._id},
        (err, profile) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(profile)
        }
    )
})

// edit or upsert profile
userProfileRouter.put('/:blogId', (req, res, next) => {
    req.body.user = req.user._id
    req.body.blog = req.params.blogId
    Profile.findOneAndUpdate(
        {blog: req.params.blogId, user: req.user._id},
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

module.exports = userProfileRouter
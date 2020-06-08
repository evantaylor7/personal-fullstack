const express = require('express')
const profileRouter = express.Router()
const Profile = require('../models/profile.js')

// get profile
profileRouter.get('/:blogId', (req, res, next) => {
    Profile.findOne(
        {blog: req.params.blogId},
        (err, profile) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(profile)
        }
    )
})

module.exports = profileRouter
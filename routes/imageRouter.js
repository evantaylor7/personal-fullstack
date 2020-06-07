const express = require('express')
const imageRouter = express.Router()
const Image = require('../models/image.js')

imageRouter.get('/')

module.exports = imageRouter
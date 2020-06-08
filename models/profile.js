const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    img: String,
    blurb: String
})

module.exports = mongoose.model('Profile', profileSchema)
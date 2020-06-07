const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postedBy: {
        type: Schema.Types.String,
        ref: 'User',
        required: true
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    img: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Post', postSchema)
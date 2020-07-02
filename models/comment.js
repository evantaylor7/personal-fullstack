const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postedBy: {
        type: String,
        default: 'Anyonymous'
    },
    date: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema)
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
    authorName: String,
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    title: String,
    date: String,
    content: String,
    titleImg: String,
    previewImg: String,
    description: String,
    // right?
    draft: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Post', postSchema)
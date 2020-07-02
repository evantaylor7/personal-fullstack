const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
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
    postedBy: {
        type: Schema.Types.String,
        ref: 'User',
        required: true
    },
    previewImg: String,
    description: String,
    titleImg: String,
    title: String,
    authorName: String,
    date: String,
    content: String,
    contentImgs: Array,
    draft: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Post', postSchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
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
    title: {
        type: String,
        required: true,
    },
    // landing page image
    description: String,
})

module.exports = mongoose.model('Blog', blogSchema)
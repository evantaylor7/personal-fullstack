const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    blogUrl: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: Schema.Types.String,
        ref: 'User',
        required: true
    },
    authorName: String,
    settings: {
        type: Object,
        default: {
            subtitle: false,
            description: false,
            img: true,
            titleAbove: true,
            parallax: false,
            profile: true
        },
        required: true
    },
    title: Object,
    subtitle: Object,
    description: Object,
    img: String,
    published: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Blog', blogSchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    url: {
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
    title: {
        type: String,
        default: 'My Blog',
        required: true,
    },
    settings: {
        type: Object,
        default: {
            subtitle: false,
            description: false,
            img: true,
            titleAbove: true
        },
        required: true
    },
    subtitle: String,
    description: String,
    img: {
        data: Buffer,
        contentType: String
    },
    imgUrl: String
})

module.exports = mongoose.model('Blog', blogSchema)
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
        type: Object,
        default: {content: 'My Blog', color: '#1d1d1d'},
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
    subtitle: {
        type: Object,
        default: {content: '', color: '#1d1d1d'}
    },
    description: {
        type: Object,
        default: {content: '', color: '#1d1d1d'}
    },
    // storedImg: {
    //     data: Buffer,
    //     contentType: String
    // },
    img: String
})

module.exports = mongoose.model('Blog', blogSchema)
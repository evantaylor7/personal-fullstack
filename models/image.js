const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
    imageName: {
        type: String,
        default: 'none',
        required: true
    },
    imageData: {
        type: String,
        required: true
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    }
})

module.exports = mongoose.model('Image', imageSchema)
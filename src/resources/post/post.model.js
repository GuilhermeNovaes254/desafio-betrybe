const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    title: {
        type: "string",
        required: true
    },
    content: {
        type: "string",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    published: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }

})

const Post = mongoose.model('Post', postSchema)

exports.Post = Post;
exports.postSchema = postSchema;
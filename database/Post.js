const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    author: {
        type: String,
        trim: true,
        required: true
    },

    text: {
        type: String,
        trim: true,
        required: true
    },

    createdAt: {
        type: Date,
        trim: true,
        default: Date.now
    },

    commentsNumber: {
        type: Number,
        default: 0
    },
    comments: {
        type: [],
    }
});

module.exports = mongoose.model("Post", PostSchema);
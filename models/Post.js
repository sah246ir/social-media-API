const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    textContent: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    followerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    followeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Follow = mongoose.model("Follow", followSchema);

module.exports = Follow;

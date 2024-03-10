const mongoose = require("mongoose"); 

const userSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true, 
    },
    bio: {
        type: String,
        default: ""
    },
    profilePictureURL: {
        type: String,
        default: "default-profile-picture.jpg" // You can set a default URL or leave it empty
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

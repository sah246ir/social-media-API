// userHelpers.js
const Follow = require('../models/Follow');
const Post = require('../models/Post');
const User = require('../models/User');

/**
 * Get the list of followers for the current user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */


async function viewProfile(req, res) {
  try {
    // Extracting the authenticated user from the request
    const user = req.user;


    // Sending the user's profile as a response
    res.status(200).json(user);
  } catch (error) {
    // Handling errors and sending an error response if there is an issue
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateProfile(req, res) {
  try {
    // Extracting the user ID and profile details from the request 
    const { username, bio, profilePictureURL } = req.body;


    // Finding the user in the database by their user ID
    const user = req.user;
    // Checking if the new username is already taken
    if (user.username !== username && (await User.exists({ username: { $eq: username } }))) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Updating the user's profile in the database
    await User.updateOne({ _id: req.user._id }, {
      username: username,
      bio: bio,
      profilePictureURL: profilePictureURL
    });

    // Sending a success message as a response
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    // Handling errors and sending an error response if there is an issue
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function deleteProfile(req, res) {
  try {
    // Deleting the user's profile from the database
    await User.deleteOne({ _id: { $eq: req.user._id } });
    await Post.deleteMany({ userID: { $eq: req.user._id } });
    await Follow.deleteMany({ followee: { $eq: req.user._id } });
    await Follow.deleteMany({ follower: { $eq: req.user._id } });

    // Sending a success message as a response
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    // Handling errors and sending an error response if there is an issue
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function viewUserProfile(req, res) {
  try {
    // Extracting the username from the request parameters
    const { username } = req.params;

    // Finding the user in the database by their username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Sending the user's profile as a response
    res.status(200).json(user);
  } catch (error) {
    // Handling errors and sending an error response if there is an issue
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



// Exporting the functions for use in other modules
module.exports = {
  viewProfile,
  viewUserProfile,
  updateProfile,
  deleteProfile
};


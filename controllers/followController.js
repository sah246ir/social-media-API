const Follow = require('../models/Follow');
const User = require('../models/User');
const mongoose = require('mongoose');


/**
 * Get the list of followers for the current user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */


// Async function to handle user follow
async function followUser(req, res) {
  try {
    // Extracting user and loggedInUserId from request parameters
    const { userId } = req.params;
    // Checking if userId is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400);
      return res.json({ error: 'Invalid User ID format' });
    }
    const loggedInUserId = req.user._id;



    // Checking if the user is trying to follow their own profile
    if (userId === loggedInUserId) {
      return res.status(400).json({ error: 'Cannot follow your own profile' });
    }

    // Finding the user to be followed
    let followee = await User.findById(userId);
    if (!followee) {
      return res.status(404).json({ error: 'Followee user not found' });

    }
    // Creating a new follow entry and saving it to the database
    let follow = new Follow({
      followerID: loggedInUserId,
      followeeID: followee._id,
    });
    await follow.save();

    // Sending a success response after user follow
    res.status(200).json({ message: 'User followed successfully' });
  } catch (error) {
    // Handling errors and sending an error response if follow fails
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Async function to handle user unfollow
async function unfollowUser(req, res) {
  try {
    // Extracting user and loggedInUserId from request parameters
    const { userId } = req.params;
    const loggedInUserId = req.user._id;
    // Checking if userId is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400);
      return res.json({ error: 'Invalid User ID format' });
    }


    // Checking if the user is trying to unfollow their own profile
    if (userId === loggedInUserId) {
      res.status(400)
      return res.json({ error: 'Cannot unfollow your own profile' });
    }

    // Finding the user to be unfollowed
    let followee = await User.findById(userId);
    if (!followee) {
      res.status(404)
      return res.json({ error: 'Followee user not found' });

    }
    // Deleting the follow entry from the database
    await Follow.deleteOne({
      followerID: loggedInUserId,
      followeeID: followee._id,
    });

    // Sending a success response after user unfollow
    res.status(200)
    return res.json({ message: 'User unfollowed successfully' });
  } catch (error) {
    // Handling errors and sending an error response if unfollow fails
    console.error(error);
    res.status(500)
    return res.json({ error: 'Internal Server Error' });
  }
}

// Async function to get followers of a specific user
async function getFollowers(req, res) {
  try {
    // Extracting userId from request parameters
    const { userId } = req.params;

    // Checking if userId is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400);
      return res.json({ error: 'Invalid User ID format' });
    }

    // Finding the user to get their followers
    let followee = await User.findById(userId);
    if (!followee) {
      return res.status(404).json({ error: 'Followee not found' });
    }

    // Getting the followers by populating the followerID field
    let followers = await Follow.find({ followeeID: { $eq: follower._id } }).populate('followerID').exec();
    followers = followers.map((f) => f.followerID);

    // Sending the list of followers as a response
    res.status(200).json(followers);
  } catch (error) {
    // Handling errors and sending an error response if retrieval fails
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Async function to get users being followed by a specific user
async function getFollowing(req, res) {
  try {
    // Extracting userId from request parameters
    const { userId } = req.params;

    // Checking if userId is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400);
      return res.json({ error: 'Invalid User ID format' });
    }


    // Finding the user to get users being followed by them
    let followee = await User.findById(userId);
    if (!followee) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Getting the users being followed by populating the followeeID field
    let following = await Follow.find({ followerID: { $eq: followee._id } }).populate('followeeID').exec();
    following = following.map((f) => f.followeeID);

    // Sending the list of users being followed as a response
    res.status(200).json(following);
  } catch (error) {
    // Handling errors and sending an error response if retrieval fails
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function getCurrentUserFollowersList(req, res) {
  try {
    // Finding the followers of the current user and populating follower details
    let followers = await Follow.find({ followeeID: { $eq: req.user._id } }).populate('followerID').exec();

    // Extracting only the follower IDs from the populated results
    followers = followers.map((f) => f.followerID);

    // Sending the list of followers as a response
    res.status(200).json(followers);
  } catch (error) {
    // Handling errors and sending an error response if there is an issue
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getCurrentUserFollowingList(req, res) {
  try {
    // Finding the users being followed by the current user and populating followee details
    let following = await Follow.find({ followerID: { $eq: req.user._id } }).populate('followeeID').exec();

    // Extracting only the followee IDs from the populated results
    following = following.map((f) => f.followeeID);

    // Sending the list of following users as a response
    res.status(200).json(following);
  } catch (error) {
    // Handling errors and sending an error response if there is an issue
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getCurrentUserFollowersList,
  getCurrentUserFollowingList
};

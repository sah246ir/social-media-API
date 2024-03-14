// Async function to handle user follow
async function followUser(req, res) {
  try {
    // Extracting username from request parameters
    const { username } = req.params;
    const loggedInUserId = req.user._id;

    // Finding the user to be followed by username
    const followee = await User.findOne({ username });
    if (!followee) {
      return res.status(404).json({ error: 'Followee user not found' });
    }

    // Checking if the user is trying to follow their own profile
    if (followee._id.toString() === loggedInUserId.toString()) {
      return res.status(400).json({ error: 'Cannot follow your own profile' });
    }

    // Creating a new follow entry and saving it to the database
    const follow = new Follow({
      follower: loggedInUserId,
      followee: followee._id,
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
    // Extracting username from request parameters
    const { username } = req.params;
    const loggedInUserId = req.user._id;

    // Finding the user to be unfollowed by username
    const followee = await User.findOne({ username });
    if (!followee) {
      return res.status(404).json({ error: 'Followee user not found' });
    }

    // Checking if the user is trying to unfollow their own profile
    if (followee._id.toString() === loggedInUserId.toString()) {
      return res.status(400).json({ error: 'Cannot unfollow your own profile' });
    }

    // Deleting the follow entry from the database
    await Follow.deleteOne({
      follower: loggedInUserId,
      followee: followee._id,
    });

    // Sending a success response after user unfollow
    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    // Handling errors and sending an error response if unfollow fails
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Async function to get followers of a specific user
async function getFollowers(req, res) {
  try {
    // Extracting username from request parameters
    const { username } = req.params;

    // Finding the user to get their followers by username
    const followee = await User.findOne({ username });
    if (!followee) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Getting the followers by populating the follower field
    const followers = await Follow.find({ followee: followee._id }).populate('follower').exec();

    // Sending the list of followers as a response
    res.status(200).json(followers.map(f => f.follower));
  } catch (error) {
    // Handling errors and sending an error response if retrieval fails
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Async function to get users being followed by a specific user
async function getFollowing(req, res) {
  try {
    // Extracting username from request parameters
    const { username } = req.params;

    // Finding the user to get users being followed by them by username
    const follower = await User.findOne({ username });
    if (!follower) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Getting the users being followed by populating the followee field
    const following = await Follow.find({ follower: follower._id }).populate('followee').exec();

    // Sending the list of users being followed as a response
    res.status(200).json(following.map(f => f.followee));
  } catch (error) {
    // Handling errors and sending an error response if retrieval fails
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
};

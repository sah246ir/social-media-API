const Follow = require('../models/Follow');
const Message = require('../models/Message');
const User = require('../models/User');
const Post = require('../models/Post');

async function getHomePageData(req, res) {
    try {
        // Get the current user's username
        const currentUser = req.user;

        // Get IDs of users being followed by the current user
        const followeeIDs = await Follow.distinct('followee', { follower: currentUser._id });

        // Get latest posts from users being followed
        const latestPosts = await Post.find({ user: { $in: followeeIDs } })
            .sort({ timestamp: -1 })
            .populate('user', 'username');

        // Find unseen conversations where the current user is the receiver
        const unseenConversations = await Message.find({ receiver: currentUser._id, seen: false }).distinct('sender');

        // Find usernames of unseen conversation participants
        const unseenConversationUsernames = await User.find({ _id: { $in: unseenConversations } }, 'username');

        // Generate links to unseen conversations
        const conversationLinks = unseenConversationUsernames.map(user => ({
            username: user.username,
            conversationlink: `/messages/conversation/${user.username}`
        }));

        // Sending the combined data as a response
        res.status(200).json({
            username: currentUser.username,
            unseenConversations: conversationLinks,
            latestPosts
        });
    } catch (error) {
        // Handling errors and sending an error response if there is an issue
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getHomePageData
};

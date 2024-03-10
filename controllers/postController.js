const Post = require('../models/Post');
const Follow = require('../models/Follow');
const User = require('../models/User');
const mongoose = require('mongoose');
async function getUserPosts(req, res) {
    try {
        const posts = await Post.find({
            userID: { $eq: req.user._id },
        });

        res.status(200)
        return res.json({
            username: req.user.username,
            posts
        });
    } catch (error) {
        console.error(error);
        res.status(500)
        return res.json({ error: 'Internal Server Error' });
    }
}

async function createPost(req, res) {
    try {
        const { textcontent } = req.body;
        if (!textcontent) {
            res.status(400)
            return res.json({ error: 'Invalid Input: Please give some valid post content' });
        }
        const post = new Post({
            textContent: textcontent,
            userID: req.user._id,
        });

        await post.save();

        res.status(200)
        return res.json({ message: 'Post created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500)
        return res.json({ error: 'Internal Server Error' });
    }
}

async function getUserPostsByUserId(req, res) {
    try {
        const user = await User.findById(req.params.userId)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const posts = await Post.find({
            userID: { $eq: req.params.userId },
        });

        res.status(200)
        return res.json({
            username: user.username,
            posts
        });
    } catch (error) {
        console.error(error);
        res.status(500)
        return res.json({ error: 'Internal Server Error' });
    }
}

async function getPostById(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.postId)) {
            res.status(400);
            return res.json({ error: 'Invalid Post ID format' });
        }
        const post = await Post.findOne({
            _id: { $eq: req.params.postId },
            userID: { $eq: req.user._id },
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200)
        return res.json({ post });
    } catch (error) {
        console.error(error);
        res.status(500)
        return res.json({ error: 'Internal Server Error' });
    }
}

async function updatePost(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.postId)) {
            res.status(400);
            return res.json({ error: 'Invalid Post ID format' });
        }
        const { textcontent } = req.body;
        if (!textcontent) {
            res.status(400);
            return res.json({ error: 'no textcontent provided' });
        }
        const existingPost = await Post.findOne({
            _id: req.params.postId,
            userID: req.user._id
        });

        if (!existingPost) {
            res.status(404);
            return res.json({ error: 'Post not found or unauthorized' });
        }
        await Post.findOneAndUpdate(
            {
                _id: req.params.postId,
                userID: req.user._id
            },
            {
                textContent: { $eq: textcontent },
            }
        );

        res.status(200)
        return res.json({ message: 'Post updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500)
        return res.json({ error: 'Internal Server Error' });
    }
}

async function deletePost(req, res) {
    try {
        const existingPost = await Post.findOne({
            _id: req.params.postId,
            userID: req.user._id
        });

        if (!existingPost) {
            res.status(404);
            return res.json({ error: 'Post not found or unauthorized' });
        }
        await Post.findOneAndDelete({
            _id: req.params.postId,
            userID: req.user._id
        });

        res.status(200)
        return res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500)
        return res.json({ error: 'Internal Server Error' });
    }
}

async function getLatestPosts(req, res) {
    try {

        const followeeIDs = await Follow.distinct('followeeID', { followerID: req.user._id });
        const posts = await Post.aggregate([
            {
                $match: {
                    userID: { $in: followeeIDs }
                }
            }
            ,
            {
                $sort: { timestamp: -1 }
            }
        ])

        res.status(200)
        return res.json({ posts });
    } catch (error) {
        console.error(error);
        res.status(500)
        return res.json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getUserPosts,
    createPost,
    getUserPostsByUserId,
    getPostById,
    updatePost,
    deletePost,
    getLatestPosts,
};

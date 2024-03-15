const express = require('express'); 
const { verifyToken } = require('../middleware'); 
const router = express.Router();
const {
  getUserPosts,
  createPost,
  getUserPostsByUsername,
  getPostById,
  updatePost,
  deletePost,
  getLatestPosts,
} = require("../controllers/postController")

// Route Prefix -> /posts

router.use(verifyToken) 

router.get('',getUserPosts);

router.post('',createPost);

router.get('/user/:username',getUserPostsByUsername);

router.get('/view/:postId',getPostById);

router.put('/update/:postId',updatePost);

router.delete('/:postId',deletePost);

router.get('/view/latest-posts',getLatestPosts);

module.exports = router;

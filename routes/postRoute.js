const express = require('express'); 
const { verifyToken } = require('../middleware'); 
const router = express.Router();
const {
  getUserPosts,
  createPost,
  getUserPostsByUserId,
  getPostById,
  updatePost,
  deletePost,
  getLatestPosts,
} = require("../controllers/postController")

// Route Prefix -> /posts

router.use(verifyToken) 

router.get('',getUserPosts);

router.post('',createPost);

router.get('/user/:userId',getUserPostsByUserId);

router.get('/:postId',getPostById);

router.put('/update/:postId',updatePost);

router.delete('/:postId',deletePost);

router.get('/view/latest-posts',getLatestPosts);

module.exports = router;

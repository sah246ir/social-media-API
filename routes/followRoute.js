const express = require('express'); 
const { verifyToken } = require('../middleware'); 
const router = express.Router();
const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getCurrentUserFollowersList,
  getCurrentUserFollowingList
} = require("../controllers/followController")


// Route Prefix -> /action

router.use(verifyToken)

router.get('/follow/:username',followUser);

router.get('/unfollow/:username',unfollowUser);

router.get('/followers/:username',getFollowers); 

router.get('/following/:username',getFollowing);

module.exports = router;

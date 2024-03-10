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

router.get('/follow/:userId',followUser);

router.get('/unfollow/:userId',unfollowUser);

router.get('/followers/:userId',getFollowers);

router.get('/followers',getCurrentUserFollowersList);


router.get('/following',getCurrentUserFollowingList);


router.get('/following/:userId',getFollowing);

module.exports = router;

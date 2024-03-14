const express = require('express'); 
const { verifyToken } = require('../middleware');
const router = express.Router();
const {
  viewProfile,
  viewUserProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/userController")


// Route Prefix -> /profile
router.use(verifyToken)

router.get('',viewProfile);

router.get('/:username',viewUserProfile);

router.put('',updateProfile);

router.delete('',deleteProfile);

module.exports = router;

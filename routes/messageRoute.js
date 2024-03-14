const express = require('express'); 
const router = express.Router(); 
 const { sendMessage,getConversation } = require('../controllers/messageController');
const { verifyToken } = require('../middleware');

 router.use(verifyToken)

// Route Prefix -> /auth

router.post('/send', sendMessage); 
router.get('/conversation/:username', getConversation);

 
module.exports = router;

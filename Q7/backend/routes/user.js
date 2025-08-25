const exp = require('express');
const router = exp.Router();
const auth = require('../middleware/auth');
const {getProfile,UpdateProfile} = require('../controllers/userController');

router.get('/me',auth,getProfile);
router.put('/me',auth,UpdateProfile);

module.exports = router;
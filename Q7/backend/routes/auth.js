const express = require('express');
const router = express.Router();
const { register, login, createAdmin } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/create-admin', createAdmin);

module.exports = router;
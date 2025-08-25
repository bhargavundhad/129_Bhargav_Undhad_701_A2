const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {
  placeOrder,
  getUserOrders,
  updateOrderStatus
} = require('../controllers/orderController');

router.post('/', auth, placeOrder);
router.get('/user', auth, getUserOrders);
router.put('/:id/status', auth, admin, updateOrderStatus);

module.exports = router;

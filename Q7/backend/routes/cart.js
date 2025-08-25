const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem
} = require('../controllers/cartController');

router.get('/', auth, getCart);
router.post('/add', auth, addToCart);
router.put('/update/:id', auth, updateCartItem);
router.delete('/remove/:id', auth, removeCartItem);

module.exports = router;

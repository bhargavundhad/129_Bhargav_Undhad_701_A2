const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', auth, admin, createProduct);
router.put('/:id', auth, admin, updateProduct);
router.delete('/:id', auth, admin, deleteProduct);

module.exports = router;

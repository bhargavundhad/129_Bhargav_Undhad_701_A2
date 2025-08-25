const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

router.get('/', getAllCategories);
router.post('/', auth, admin, createCategory);
router.put('/:id', auth, admin, updateCategory);
router.delete('/:id', auth, admin, deleteCategory);

module.exports = router;

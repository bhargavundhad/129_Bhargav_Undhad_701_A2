const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

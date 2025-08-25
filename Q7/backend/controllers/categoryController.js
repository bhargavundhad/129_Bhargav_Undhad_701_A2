const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const category = new Category({ name, parent: parent || null });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name, parent: parent || null },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

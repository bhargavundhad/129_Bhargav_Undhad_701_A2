const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');
const bcryptjs = require('bcryptjs');
// const { use } = require('react');

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const hashedPassword23 = await bcryptjs.hash('bhargav123', 10);
    const user = new User({
      name: 'John Doe',
      email: 'bhargav@gmail.com',
      password: hashedPassword23,
    });

    await user.save();
    console.log("user created");

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create categories
    const categories = await Category.insertMany([
      { name: 'Electronics' },
      { name: 'Clothing' },
      { name: 'Books' },
      { name: 'Home & Garden' }
    ]);
    console.log('Categories created');

    // Create products
    const products = [
      {
        name: 'Smartphone',
        description: 'Latest Android smartphone with great camera',
        price: 25000,
        image: 'https://via.placeholder.com/300x200?text=Smartphone',
        category: categories[0]._id
      },
      {
        name: 'Laptop',
        description: 'High-performance laptop for work and gaming',
        price: 55000,
        image: 'https://via.placeholder.com/300x200?text=Laptop',
        category: categories[0]._id
      },
      {
        name: 'T-Shirt',
        description: 'Comfortable cotton t-shirt',
        price: 800,
        image: 'https://via.placeholder.com/300x200?text=T-Shirt',
        category: categories[1]._id
      },
      {
        name: 'Jeans',
        description: 'Classic blue denim jeans',
        price: 2500,
        image: 'https://via.placeholder.com/300x200?text=Jeans',
        category: categories[1]._id
      },
      {
        name: 'Programming Book',
        description: 'Learn JavaScript from basics to advanced',
        price: 1200,
        image: 'https://via.placeholder.com/300x200?text=Book',
        category: categories[2]._id
      },
      {
        name: 'Plant Pot',
        description: 'Beautiful ceramic plant pot',
        price: 450,
        image: 'https://via.placeholder.com/300x200?text=Plant+Pot',
        category: categories[3]._id
      }
    ];

    await Product.insertMany(products);
    console.log('Products created');

    // Create admin user if doesn't exist
    const adminExists = await User.findOne({ email: 'admin@shop.com' });
    if (!adminExists) {
      const hashPassword = await bcryptjs.hash('admin123', 10);
      await User.create({
        name: 'Admin User',
        email: 'admin@shop.com',
        password: hashPassword,
        isAdmin: true
      });
      console.log('Admin user created: admin@shop.com / admin123');
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/categories', require('./routes/category'));
app.use('/api/products', require('./routes/product'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/order'));
// Serve index.html for any non-API routes (SPA support)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
  }
});

// DB + Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`)))
  .catch(err => console.error(err));

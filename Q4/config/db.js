const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DBURL);
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));

module.exports = mongoose;
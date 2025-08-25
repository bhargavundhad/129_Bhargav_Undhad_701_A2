const express = require('express');
// const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ secret: 'erpsecret', resave: false, saveUninitialized: true }));
app.set('view engine', 'ejs');

// mongoose.connect('mongodb://localhost:27017/erp-admin');

app.use('/', require('./routes/admin'));

app.listen(8000, () => console.log('ERP Admin running on http://localhost:8000'));

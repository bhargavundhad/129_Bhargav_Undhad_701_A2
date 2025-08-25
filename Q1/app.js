const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// Routes
app.get('/', (req, res) => {
  res.render('form', { errors: {}, data: {} });
});

app.post('/submit', upload.fields([
  { name: 'profilePic', maxCount: 1 },
  { name: 'otherPics', maxCount: 5 }
]), (req, res) => {
  const { username, password, confirmPassword, email, gender, hobbies } = req.body;
  const errors = {};
  const data = { ...req.body };

  // Validation
  if (!username) errors.username = 'Username is required';
  if (!email || !email.includes('@')) errors.email = 'Valid email is required';
  if (!password || password.length < 6) errors.password = 'Password must be at least 6 characters';
  if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
  if (!gender) errors.gender = 'Gender is required';
  if (!hobbies) errors.hobbies = 'Select at least one hobby';
  if (!req.files['profilePic']) errors.profilePic = 'Profile picture is required';

  // If errors, re-render form
  if (Object.keys(errors).length > 0) {
    res.render('form', { errors, data });
  } else {
    data.profilePic = req.files['profilePic'][0].filename;
    data.otherPics = req.files['otherPics'] ? req.files['otherPics'].map(f => f.filename) : [];
    res.render('result', { data });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));





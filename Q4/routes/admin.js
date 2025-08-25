const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const Employee = require('../models/Employee');

const isAuth = (req, res, next) => req.session.user ? next() : res.redirect('/login');

router.get('/login', (req, res) => res.render('login'));
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    req.session.user = username;
    res.redirect('/dashboard');
  } else {
    res.send('Invalid credentials');
  }
});

router.get('/dashboard', isAuth, async (req, res) => {
  const employees = await Employee.find();
  res.render('dashboard', { employees });
});

router.get('/add', isAuth, (req, res) => res.render('employee_form'));
router.post('/add', isAuth, async (req, res) => {
  const { name, email, baseSalary, bonus } = req.body;
  const empid = 'EMP' + Math.floor(Math.random() * 10000);
  const rawPass = Math.random().toString(36).slice(-8);
  const hashedPass = await bcrypt.hash(rawPass, 10);
  const totalSalary = parseFloat(baseSalary) + parseFloat(bonus);

  const employee = new Employee({ empid, name, email, baseSalary, bonus, totalSalary, password: hashedPass });
  await employee.save();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to ERP',
    text: `Hi ${name}, your Employee ID is ${empid} and password is ${rawPass}`
  });

  res.redirect('/dashboard');
});

router.get('/delete/:id', isAuth, async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.redirect('/dashboard');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;

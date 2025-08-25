const dbCon = require('../config/db');

const employeeSchema = dbCon.Schema({
  empid: String,
  name: String,
  email: String,
  baseSalary: Number,
  bonus: Number,
  totalSalary: Number,
  password: String
});

module.exports = dbCon.model('Employee', employeeSchema);


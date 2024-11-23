const express = require('express');
const staffRouter = express.Router();
const { registerStaff, loginStaff } = require("../controllers/staff.js");

staffRouter.post('/registerStaff', registerStaff);
staffRouter.post('/loginStaff', loginStaff);

module.exports = staffRouter;

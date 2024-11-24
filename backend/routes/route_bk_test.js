const express = require("express");
const router = express.Router();

const { createBkTest, getBookedTests, updateBookTestById, generatePDF } = require('../controllers/book_test.js');

router.post('/createBkTest', createBkTest);
router.get('/getBookedTests', getBookedTests);
router.put('/updateBookTestById/:id', updateBookTestById);
router.get('/labReports/getReport/:id', generatePDF);


module.exports = router;




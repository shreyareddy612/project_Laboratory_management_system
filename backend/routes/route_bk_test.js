const express = require("express");
const router = express.Router();

const { createBkTest, getBookedTests, updateBookTestById } = require('../controllers/book_test.js');

router.post('/createBkTest', createBkTest);
router.get('/getBookedTests', getBookedTests);
router.put('/updateBookTestById:id', updateBookTestById);

module.exports = router;
